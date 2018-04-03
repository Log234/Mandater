﻿import { County } from "ClientApp/interfaces/County";

export interface Election {
    electionId: number,
    year: number,
    algorithm: number,
    firstDivisor: number,
    threshold: number,
    seats: number,
    levelingSeats: number,
    countryId: number,
    electionTypeId: number,
    counties: Array<County>
}