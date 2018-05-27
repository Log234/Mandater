import { ElectionType } from "../interfaces/ElectionType";
import { PartyResultDictionary } from "../interfaces/PartyResultDictionary";
import { ComputationAction } from "../types/ActionTypes";
import { Election } from "../interfaces/Election";
import { ComputationPayload } from "../interfaces/ComputationPayload";
import { computeAlgorithm } from "../logic/Algorithm";
import { getAlgorithmType } from "../logic/AlgorithmUtils";
import { AlgorithmType } from "../types/Algorithms";
import { County } from "../interfaces/County";

export interface InitializeComputationAction extends ComputationPayload {
    type: ComputationAction.InitializeComputation,
    partyResults: PartyResultDictionary;
}

export interface UpdateResultsAction extends ComputationPayload {
    type: ComputationAction.UpdateResults,
    partyResults: PartyResultDictionary;
}

export function initializeComputation(electionType: ElectionType) {
    const election: Election = electionType.elections[0]; // Most recent election
    const payload = {
        counties: election.counties,
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