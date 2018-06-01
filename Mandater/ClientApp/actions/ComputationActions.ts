import { ElectionType } from "../interfaces/ElectionType";
import { ComputationAction } from "../types/ActionTypes";
import { Election } from "../interfaces/Election";
import { ComputationPayload } from "../interfaces/ComputationPayload";
import { computeAlgorithm } from "../logic/Algorithm";
import { getAlgorithmType } from "../logic/AlgorithmUtils";
import { ComputationResults } from "../logic/ComputationResult";

export interface InitializeComputationAction extends ComputationPayload {
    type: ComputationAction.InitializeComputation,
    partyResults: ComputationResults;
}

export interface UpdateResultsAction extends ComputationPayload {
    type: ComputationAction.UpdateResults,
    partyResults: ComputationResults;
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
    const results = computeAlgorithm(payload);
    const initializeAction: InitializeComputationAction = {
        type: ComputationAction.InitializeComputation,
        ...payload,
        partyResults: results
    };
    return initializeAction;
}

export function updateElectionData(payload: ComputationPayload) {
    const results = computeAlgorithm(payload);

    const updateCalculationAction: UpdateResultsAction = {
        ...payload,
        type: ComputationAction.UpdateResults,
        partyResults: results
    };
    return updateCalculationAction;
}