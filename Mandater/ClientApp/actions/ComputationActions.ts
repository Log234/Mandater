import { ElectionType } from "../interfaces/ElectionType";
import { ComputationAction } from "../types/ActionTypes";
import { Election } from "../interfaces/Election";
import { ComputationPayload } from "../interfaces/ComputationPayload";
import { getAlgorithmType } from "../logic/AlgorithmUtils";
import { lagueDhont } from "../logic/LagueDhont";
import { LagueDhontResult } from "../interfaces/LagueDhontResult";

export interface InitializeComputationAction extends ComputationPayload {
    type: ComputationAction.InitializeComputation;
    newResults: LagueDhontResult;
}

export interface UpdateResultsAction extends ComputationPayload {
    type: ComputationAction.UpdateResults;
    newResults: LagueDhontResult;
}

export function initializeComputation(electionType: ElectionType) {
    const election: Election = electionType.elections[0]; // Most recent election
    const payload: ComputationPayload = {
        election,
        algorithm: getAlgorithmType(election.algorithm),
        firstDivisor: election.firstDivisor,
        electionThreshold: election.threshold,
        districtSeats: election.seats,
        levelingSeats: election.levelingSeats
    };

    const newResults = lagueDhont(payload);
    const initializeAction: InitializeComputationAction = {
        type: ComputationAction.InitializeComputation,
        ...payload,
        newResults
    };
    return initializeAction;
}

export function updateElectionData(payload: ComputationPayload) {
    const newResults = lagueDhont(payload);

    const updateCalculationAction: UpdateResultsAction = {
        ...payload,
        type: ComputationAction.UpdateResults,
        newResults
    };
    return updateCalculationAction;
}