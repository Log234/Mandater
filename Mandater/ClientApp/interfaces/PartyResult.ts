import { ProcessedResult } from "../interfaces/ProcessedResult";

export interface PartyResult {
    partyName: string,
    partyCode: string,
    districtSeats: number,
    levelingSeats: number,
    sum: number,
    percent: number,
    totalVotes: number,
    resultsPerCounty: ProcessedResult[],
}