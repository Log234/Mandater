import { ComputationPayload } from "../interfaces/ComputationPayload";
import { Result } from "../interfaces/Result";
import { Dictionary } from "../interfaces/Dictionary";
import {
    distributeSeats,
    getDenominator,
    calculateAdjustedQuotient
} from "./AlgorithmUtils";
import { PartyResult } from "../interfaces/PartyResult";
import { LevelingSeat } from "../interfaces/LevelingSeat";
import { DistrictResult } from "../interfaces/DistrictResult";
import { PartyRestQuotients } from "../interfaces/PartyRestQuotients";
import { dictionaryToArray } from "./DictionaryUtilities";

export function distributeLevelingSeats(
    payload: ComputationPayload,
    partyResults: Dictionary<PartyResult>,
    districtPartyResults: Dictionary<Dictionary<PartyResult>>,
    districtResults: Dictionary<DistrictResult>
): PartyRestQuotients[] {
    // Filter out parties with less than the threshold
    let levelingPartyCodes = Object.keys(partyResults).filter(
        partyCode =>
            partyResults[partyCode].percentVotes >= payload.electionThreshold
    );

    let levelingParties: Result[] = [];
    for (const partyCode of levelingPartyCodes) {
        const party: Result = {
            countyId: -1,
            electionId: -1,
            partyId: -1,
            resultId: -1,
            countyName: "",
            partyCode,
            partyName: "",
            votes: partyResults[partyCode].votes,
            percentage: -1
        };
        levelingParties.push(party);
    }

    // Compute the distribution of the total number of seats on the whole country
    const nationalDistribution = distributeSeats(
        payload.algorithm,
        payload.firstDivisor,
        payload.districtSeats + payload.levelingSeats,
        levelingParties
    );

    // Filter out parties that did not gain any seats in the new distribution
    levelingPartyCodes = levelingPartyCodes.filter(
        p => nationalDistribution.seatsWon[p] > partyResults[p].districtSeats
    );

    levelingParties = [];
    for (const partyCode of levelingPartyCodes) {
        const party: Result = {
            countyId: -1,
            electionId: -1,
            partyId: -1,
            resultId: -1,
            countyName: "",
            partyCode,
            partyName: "",
            votes: partyResults[partyCode].votes,
            percentage: -1
        };
        levelingParties.push(party);
    }

    // Distribute the leveling seats, taking the district seats into account
    const levelingSeatsDistribution = distributeSeats(
        payload.algorithm,
        payload.firstDivisor,
        payload.levelingSeats,
        levelingParties,
        partyResults
    );

    for (const partyCode in levelingSeatsDistribution.seatsWon) {
        if (levelingSeatsDistribution.seatsWon.hasOwnProperty(partyCode)) {
            const levelingSeats = levelingSeatsDistribution.seatsWon[partyCode];
            partyResults[partyCode].levelingSeats += levelingSeats;
            partyResults[partyCode].totalSeats += levelingSeats;
        }
    }

    levelingPartyCodes = levelingPartyCodes.filter(
        partyCode => partyResults[partyCode].levelingSeats > 0
    );

    let levelingSeats: LevelingSeat[] = [];

    for (const countyName in districtResults) {
        if (districtPartyResults.hasOwnProperty(countyName)) {
            for (const partyCode of levelingPartyCodes) {
                const partyResult = districtPartyResults[countyName][partyCode];
                if (partyResult !== undefined) {
                    const adjustedQuotient = calculateAdjustedQuotient(
                        payload.algorithm,
                        partyResult,
                        districtResults[countyName]
                    );
                    const seat: LevelingSeat = {
                        district: countyName,
                        partyCode,
                        quotient: adjustedQuotient,
                        seatNumber: 0
                    };
                    levelingSeats.push(seat);
                }
            }
        }
    }

    levelingSeats.sort((v, t) => t.quotient - v.quotient);
    const partyRestQuotients: Dictionary<PartyRestQuotients> = {};

    const partySeats: Dictionary<number> = {};
    let seatIndex = 1;
    while (seatIndex <= payload.levelingSeats) {
        const completedDistricts: Set<string> = new Set();
        const remainingLevelingSeats: LevelingSeat[] = [];

        for (const seat of levelingSeats) {
            let numberOfSeats = partySeats[seat.partyCode];
            if (numberOfSeats === undefined) {
                numberOfSeats = 0;
                partySeats[seat.partyCode] = 0;
            }

            if (numberOfSeats < partyResults[seat.partyCode].levelingSeats) {
                if (!completedDistricts.has(seat.district)) {
                    seat.seatNumber = seatIndex++;

                    partySeats[seat.partyCode]++;
                    districtResults[seat.district].levelingSeats++;
                    districtPartyResults[seat.district][seat.partyCode]
                        .levelingSeats++;
                    districtPartyResults[seat.district][seat.partyCode]
                        .totalSeats++;

                    completedDistricts.add(seat.district);

                    if (partyRestQuotients[seat.partyCode] === undefined) {
                        partyRestQuotients[seat.partyCode] = {
                            partyCode: seat.partyCode,
                            levelingSeats: [seat]
                        };
                    } else {
                        partyRestQuotients[seat.partyCode].levelingSeats.push(
                            seat
                        );
                    }

                    const adjustedQuotient = calculateAdjustedQuotient(payload.algorithm, districtPartyResults[seat.district][seat.partyCode], districtResults[seat.district]);
                    remainingLevelingSeats.push({
                        district: seat.district,
                        partyCode: seat.partyCode,
                        quotient: adjustedQuotient,
                        seatNumber: 0
                    });
                } else {
                    remainingLevelingSeats.push(seat);
                }
            }
        }

        levelingSeats = remainingLevelingSeats;
    }

    for (const seat of levelingSeats) {
        if (partyRestQuotients[seat.partyCode] === undefined) {
            partyRestQuotients[seat.partyCode] = {
                partyCode: seat.partyCode,
                levelingSeats: [seat]
            };
        } else {
            partyRestQuotients[seat.partyCode].levelingSeats.push(seat);
        }
    }

    const levelingSeatDistribution = dictionaryToArray(partyRestQuotients);
    return levelingSeatDistribution;
}
