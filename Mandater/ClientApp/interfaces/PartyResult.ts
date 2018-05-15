import { ProcessedResult } from "ClientApp/interfaces/ProcessedResult";

export interface PartyResult {
    partyName: string,
    partyCode: string,
    sum: number,
    percent: number,
    totalVotes: number,
    resultsPerCounty: ProcessedResult[],
}