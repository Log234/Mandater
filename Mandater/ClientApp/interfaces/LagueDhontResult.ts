import { PartyResult } from "./PartyResult";
import { DistrictResult } from "./DistrictResult";
import { SeatResult } from "./SeatResult";

export interface LagueDhontResult {
    partyResults: PartyResult[];
    districtResults: DistrictResult[];
    levelingSeatDistribution: SeatResult[];
}