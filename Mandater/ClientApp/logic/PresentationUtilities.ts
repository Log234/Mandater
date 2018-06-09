import { PartyResult } from "../interfaces/PartyResult";
import { roundNumber } from "./NumberUtilities";
import { DistrictResult } from "../interfaces/DistrictResult";

export function getPartyTableData(
    partyResults: PartyResult[],
    showPartiesWithoutSeats: boolean,
    numberOfDecimals: number
): PartyResult[] {
    let filteredResults = [...partyResults];

    if (!showPartiesWithoutSeats) {
        filteredResults = filteredResults.filter(party => party.totalSeats > 0);
    }

    const roundedResults: PartyResult[] = [];

    for (const partyResult of filteredResults) {
        roundedResults.push({
            partyCode: partyResult.partyCode,
            partyName: partyResult.partyName,
            votes: partyResult.votes,
            percentVotes: roundNumber(
                partyResult.percentVotes,
                numberOfDecimals
            ),
            districtSeats: partyResult.districtSeats,
            levelingSeats: partyResult.levelingSeats,
            totalSeats: partyResult.totalSeats,
            proportionality: roundNumber(
                partyResult.proportionality,
                numberOfDecimals
            )
        });
    }

    return roundedResults;
}

export function getDistrictTableData(
    districtResults: DistrictResult[],
    numberOfDecimals: number
): DistrictResult[] {
    const roundedResults: DistrictResult[] = [];

    for (const districtResult of districtResults) {
        roundedResults.push({
            name: districtResult.name,
            votes: districtResult.votes,
            percentVotes: roundNumber(
                districtResult.percentVotes,
                numberOfDecimals
            ),
            districtSeats: districtResult.districtSeats,
            levelingSeats: districtResult.levelingSeats,
            districtSeatResult: districtResult.districtSeatResult,
            partyResults: districtResult.partyResults
        });
    }

    return roundedResults;
}

export function getSeatsPerPartyData(partyResults: PartyResult[], showPartiesWithoutSeats: boolean): PartyResult[] {
    if (showPartiesWithoutSeats) {
        return partyResults;
    } else {
        return partyResults.filter(party => party.totalSeats > 0);
    }
}