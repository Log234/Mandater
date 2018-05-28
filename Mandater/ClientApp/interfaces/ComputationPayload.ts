import { AlgorithmType } from "../types/Algorithms";
import { Election } from "./Election";

export interface ComputationPayload {
    election: Election,
    algorithm: AlgorithmType,
    firstDivisor: number,
    electionThreshold: number,
    districtSeats: number,
    levelingSeats: number;
}