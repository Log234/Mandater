﻿import { Action } from "redux";
import { InitializeRequestedDataAction } from "../actions/RequestedDataActions";
import { RequestedDataState, unloadedState } from "../states/RequestedDataState";
import { RequestedDataAction } from "../types/ActionTypes";

type KnownAction = InitializeRequestedDataAction;

// NB: BaseReducer Typescript (Reducer<State>) definition changes as of redux 4.0.0
// https://github.com/rt2zz/redux-persist/pull/778

export default function (state: RequestedDataState, incomingAction: Action) {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case RequestedDataAction.InitializeRequestedData:
            console.log(`Action of type ${action.type} reduced`);
            return {
                ...state,
                electionType: action.electionType,
                enableAutoSave: true,
            };
        default:
            console.log(`Action of type ${incomingAction.type} reduced to default`);
            return state || unloadedState;
    }
}