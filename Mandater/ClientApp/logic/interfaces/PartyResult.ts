import { ProcessedResult } from "ClientApp/logic/interfaces/ProcessedResult";

export interface PartyResult {
    partyName: string,
    partyCode: string,
    sum: number,
    resultsPerCounty: ProcessedResult[],
}