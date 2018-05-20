import { PartyResultDictionary } from "ClientApp/interfaces/PartyResultDictionary";
import { ElectionType } from "../ElectionType";
import { AlgorithmType } from "../../enums/AlgorithmEnums";

export interface ElectionState {
    electionYears: number[],
    year: number,
    electionType: ElectionType,
    algorithm: AlgorithmType,
    firstDivisor: number,
    electionThreshold: number,
    districSeats: number,
    levelingSeats: number,
    partyResults: PartyResultDictionary;
}