import { AlgorithmType } from "../types/Algorithms";
import { County } from "../interfaces/County";

export interface ComputationPayload {
    counties: County[],
    algorithm: AlgorithmType,
    firstDivisor: number,
    electionThreshold: number,
    districtSeats: number,
    levelingSeats: number;
}