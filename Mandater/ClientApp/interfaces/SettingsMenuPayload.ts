import { AlgorithmType } from "../types/Algorithms";
import { ElectionType } from "./ElectionType";

export type SettingsMenuPayload = {
    year: number,
    electionType: ElectionType,
    algorithm: AlgorithmType,
    firstDivisor: number,
    electionThreshold: number,
    districtSeats: number,
    levelingSeats: number,
    autoCompute: boolean,
    forceCompute: boolean;
}