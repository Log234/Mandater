import { PartyResultDictionary } from "ClientApp/interfaces/PartyResultDictionary";
import { ElectionType } from "../ElectionType";
import { AlgorithmType } from "../../enums/AlgorithmEnums";

export interface ElectionState {
    electionYears: number[],
    year: number,
    electionType: ElectionType,
    algorithm: AlgorithmType,
    firstDivisor: number,
    firstDivisorPlaceholder: number,
    electionThreshold: number,
    electionThresholdPlaceholder: number,
    districSeats: number,
    districSeatsPlaceholder: number,
    levelingSeats: number,
    levelingSeatsPlaceholder: number,
    partyResults: PartyResultDictionary;
}