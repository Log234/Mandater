import { PartyResultDictionary } from "../interfaces/PartyResultDictionary";
import { County } from "../interfaces/County";
import { AlgorithmType } from "../types/Algorithms";

export interface ComputationState {
    counties: County[];
    algorithm: AlgorithmType,
    firstDivisor: number,
    electionThreshold: number,
    districtSeats: number,
    levelingSeats: number,
    partyResults: PartyResultDictionary
}

export const unloadedState: ComputationState = {
    counties: [],
    algorithm: AlgorithmType.Undefined,
    firstDivisor: -1,
    electionThreshold: -1,
    districtSeats: -1,
    levelingSeats: -1,
    partyResults: {},
};