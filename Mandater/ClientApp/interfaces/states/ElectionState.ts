import { Election } from "ClientApp/interfaces/Election";
import { PartyResultDictionary } from "ClientApp/interfaces/PartyResultDictionary";
import { ElectionType } from "../ElectionType";

export interface ElectionState {
    electionYears: number[],
    firstDivisor: number,
    electionType: ElectionType,
    partyResults: PartyResultDictionary;
}