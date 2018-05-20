import { Election } from "ClientApp/interfaces/Election";
import { AlgorithmType } from "../enums/AlgorithmEnums";

export type AlgorithmPayload = {
    election: Election,
    year: number,
    algorithm: AlgorithmType,
    firstDivisor: number,
    electionThreshold: number,
    districtSeats: number,
    levelingSeats: number;
}