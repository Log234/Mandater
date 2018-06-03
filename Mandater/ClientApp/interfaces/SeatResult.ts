import { SeatPartyResult } from "./SeatPartyResult";

export interface SeatResult {
    seatIndex: number;
    winner: string;
    partyResults: SeatPartyResult[];
}