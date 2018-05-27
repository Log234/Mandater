import { Action } from "redux";
import { ComputationState, unloadedState } from "../states/ComputationState";
import { InitializeComputationAction, UpdateResultsAction } from "../actions/ComputationActions";
import { ComputationAction as ElectionActionEnum } from "../types/ActionTypes";

type KnownAction = InitializeComputationAction
                   | UpdateResultsAction

// NB: BaseReducer Typescript (Reducer<State>) definition changes as of redux 4.0.0
// https://github.com/rt2zz/redux-persist/pull/778

export default function (state: ComputationState, incomingAction: Action) {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case ElectionActionEnum.InitializeComputation:
            return {
                ...state,
                counties: action.counties,
                algorithm: action.algorithm,
                firstDivisor: action.firstDivisor,
                electionThreshold: action.electionThreshold,
                districtSeats: action.districtSeats,
                levelingSeats: action.levelingSeats,
                partyResults: action.partyResults
            };
        case ElectionActionEnum.UpdateResults:
            return {
                ...state,
                counties: action.counties,
                algorithm: action.algorithm,
                firstDivisor: action.firstDivisor,
                electionThreshold: action.electionThreshold,
                districtSeats: action.districtSeats,
                levelingSeats: action.levelingSeats,
                partyResults: action.partyResults,
            };
        default:
            return state || unloadedState;
    }
};