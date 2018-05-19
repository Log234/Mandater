import { Election } from "ClientApp/interfaces/Election";

export type AlgorithmPayload = {
    election: Election,
    firstDivisor: number,
    electionThreshold: number,
    districtSeats: number,
    levelingSeats: number;
}