import { ElectionType } from "../interfaces/ElectionType";
import { ComputationAction } from "../types/ActionTypes";
import { Election } from "../interfaces/Election";
import { ComputationPayload } from "../interfaces/ComputationPayload";
import { computeAlgorithm } from "../logic/Algorithm";
import { getAlgorithmType } from "../logic/AlgorithmUtils";
import { ComputationResults } from "../logic/ComputationResult";
import { lagueDhont } from "../logic/LagueDhontNew";
import { LagueDhontResult } from "../interfaces/LagueDhontResult";

export interface InitializeComputationAction extends ComputationPayload {
    type: ComputationAction.InitializeComputation;
    partyResults: ComputationResults;
    newResults: LagueDhontResult;
}

export interface UpdateResultsAction extends ComputationPayload {
    type: ComputationAction.UpdateResults;
    partyResults: ComputationResults;
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
    // Old
    const results = computeAlgorithm(payload);
    // New
    const newResults = lagueDhont(payload);
    const initializeAction: InitializeComputationAction = {
        type: ComputationAction.InitializeComputation,
        ...payload,
        partyResults: results,
        newResults
    };
    return initializeAction;
}

export function updateElectionData(payload: ComputationPayload) {
    // Old
    const results = computeAlgorithm(payload);
    // New
    const newResults = lagueDhont(payload);

    const updateCalculationAction: UpdateResultsAction = {
        ...payload,
        type: ComputationAction.UpdateResults,
        partyResults: results,
        newResults
    };
    return updateCalculationAction;
}