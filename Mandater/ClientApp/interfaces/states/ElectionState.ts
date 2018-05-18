import { PartyResultDictionary } from "ClientApp/interfaces/PartyResultDictionary";
import { ElectionType } from "../ElectionType";

export interface ElectionState {
    electionYears: number[],
    selectedYear: number,
    firstDivisor: number,
    electionThreshold: number,
    districSeats: number,
    levelingSeats: number,
    electionType: ElectionType,
    partyResults: PartyResultDictionary;
}