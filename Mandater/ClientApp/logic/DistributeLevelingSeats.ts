import { ComputationPayload } from "../interfaces/ComputationPayload";
import { Result } from "../interfaces/Result";
import { Dictionary } from "../interfaces/Dictionary";
import { distributeSeats, getDenominator } from "./AlgorithmUtilsNew";
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

    const levelingSeats: LevelingSeat[] = [];

    for (const countyName in districtResults) {
        if (districtPartyResults.hasOwnProperty(countyName)) {
            const curPartyResults = districtPartyResults[countyName];
            const averageSeatsPerVote =
                districtResults[countyName].votes /
                districtResults[countyName].districtSeats;

            for (const partyCode of levelingPartyCodes) {
                const result = curPartyResults[partyCode];
                if (result !== undefined) {
                    const denominator = getDenominator(
                        payload.algorithm,
                        result.districtSeats,
                        1 // When computing the leveling seats, use the unmodified Sainte Lagües
                    );
                    const quotient = result.votes / denominator;

                    const adjustedQuotient = quotient / averageSeatsPerVote;
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
    const selectedLevelingSeats: LevelingSeat[] = [];
    const partyRestQuotients: Dictionary<PartyRestQuotients> = {};

    const completedDistricts: Set<string> = new Set();
    const partySeats: Dictionary<number> = {};
    let seatIndex = 1;
    for (const seat of levelingSeats) {
        let numberOfSeats = partySeats[seat.partyCode];
        if (numberOfSeats === undefined) {
            numberOfSeats = 0;
            partySeats[seat.partyCode] = 0;
        }

        if (
            !completedDistricts.has(seat.district) &&
            numberOfSeats < partyResults[seat.partyCode].levelingSeats
        ) {
            seat.seatNumber = seatIndex++;
            partySeats[seat.partyCode]++;
            completedDistricts.add(seat.district);
            selectedLevelingSeats.push(seat);
        }

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
