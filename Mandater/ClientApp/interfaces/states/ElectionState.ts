import { PartyResultDictionary } from "ClientApp/interfaces/PartyResultDictionary";
import { ElectionType } from "../ElectionType";

export interface ElectionState {
    electionYears: number[],
    firstDivisor: number,
    electionThreshold: number,
    districSeats: number,
    levellingSeats: number,
    electionType: ElectionType,
    partyResults: PartyResultDictionary;
}