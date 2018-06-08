import { PartyResult } from "../interfaces/PartyResult";
import { roundNumber } from "./NumberUtilities";
import { DistrictResult } from "../interfaces/DistrictResult";
import { Column } from "react-table";

export function getPartyTableData(partyResults: PartyResult[], showPartiesWithoutSeats: boolean, numberOfDecimals: number): PartyResult[] {
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
            percentVotes: roundNumber(partyResult.percentVotes, numberOfDecimals),
            districtSeats: partyResult.districtSeats,
            levelingSeats: partyResult.levelingSeats,
            totalSeats: partyResult.totalSeats,
            proportionality: roundNumber(partyResult.proportionality, numberOfDecimals)
        });
    }

    return roundedResults;
}