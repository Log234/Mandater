import { PartyResultDictionary } from "ClientApp/interfaces/PartyResultDictionary";
import { ElectionType } from "../interfaces/ElectionType";
import { AlgorithmType } from "../types/Algorithms";

export interface ElectionState {
    electionYears: number[],
    year: number,
    electionType: ElectionType,
    algorithm: AlgorithmType,
    firstDivisor: number,
    firstDivisorPlaceholder: number,
    electionThreshold: number,
    electionThresholdPlaceholder: number,
    districtSeats: number,
    districtSeatsPlaceholder: number,
    levelingSeats: number,
    levelingSeatsPlaceholder: number,
    partyResults: PartyResultDictionary,
    autoCompute: boolean;
}

export const unloadedState: ElectionState = {
    electionYears: [],
    year: -1,
    algorithm: AlgorithmType.Undefined,
    firstDivisor: -1,
    firstDivisorPlaceholder: -1,
    electionThreshold: -1,
    electionThresholdPlaceholder: -1,
    districtSeats: -1,
    districtSeatsPlaceholder: -1,
    levelingSeats: -1,
    levelingSeatsPlaceholder: -1,
    electionType: {
        countryId: -1,
        electionTypeId: -1,
        internationalName: "",
        elections: []
    },
    partyResults: {},
    autoCompute: true
};