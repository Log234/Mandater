import { Dictionary } from "./Dictionary";
import { SeatResult } from "./SeatResult";

export interface DistributionResult {
    seatsWon: Dictionary<number>;
    seatResults: SeatResult[];
}