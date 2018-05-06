import { Election } from "ClientApp/interfaces/Election";
import { PartyResultDictionary } from "ClientApp/interfaces/PartyResultDictionary";

export interface ElectionState {
    electionYears: number[],
    firstDivisor: number,
    election: Election,
    partyResults: PartyResultDictionary;
}