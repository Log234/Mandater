import { ProcessedResult } from "ClientApp/interfaces/ProcessedResult";

export interface PartyResult {
    partyName: string,
    partyCode: string,
    sum: number,
    resultsPerCounty: ProcessedResult[],
}