import { AlgorithmType } from "../types/AlgorithmType";
import { Election } from "../interfaces/Election";
import { ComputationResults } from "../logic/ComputationResult";
import { PresentationType } from "../types/PresentationType";
import { LagueDhontResult } from "../interfaces/LagueDhontResult";

export interface ComputationState {
    election: Election;
    algorithm: AlgorithmType;
    firstDivisor: number;
    electionThreshold: number;
    districtSeats: number;
    levelingSeats: number;
    partyResults: ComputationResults;
    newResults: LagueDhontResult;
}

export const unloadedState: ComputationState = {
    election: {
        countryId: -1,
        electionTypeId: -1,
        electionId: -1,
        counties: [],
        year: -1,
        algorithm: 0,
        firstDivisor: -1,
        threshold: -1,
        seats: -1,
        levelingSeats: -1
    },
    algorithm: AlgorithmType.Undefined,
    firstDivisor: -1,
    electionThreshold: -1,
    districtSeats: -1,
    levelingSeats: -1,
    partyResults: new ComputationResults({
        partyCodes: [],
        districts: [],
        partyNames: [],
        getPresentationTypes: () => [],
        getTable: (tableType: PresentationType, district?: string) => { return { header: [], rowId: [], body: [] }; }
    }),
    newResults: {
        districtResults: [],
        partyResults: [],
        levelingSeatDistribution: []
    }
};