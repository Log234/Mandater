﻿import { Action, Reducer } from "redux";
import { InitializeSettingsAction, UpdateSettingsAction, ToggleAutoComputeAction } from "../actions/SettingActions";
import { SettingsState, unloadedState } from "../states/SettingState";
import { SettingAction } from "../types/ActionTypes";

// TODO: Make actions for updates of elections etc...

type KnownAction = InitializeSettingsAction
    | UpdateSettingsAction
    | ToggleAutoComputeAction

// NB: BaseReducer Typescript (Reducer<State>) definition changes as of redux 4.0.0
// https://github.com/rt2zz/redux-persist/pull/778

export default function (state: SettingsState, incomingAction: Action) {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case SettingAction.InitializeSettings:
            return {
                ...state,
                electionYears: action.electionYears,
                year: action.year,
                algorithm: action.algorithm,
                firstDivisor: action.firstDivisor,
                electionThreshold: action.electionThreshold,
                districtSeats: action.districtSeats,
                levelingSeats: action.levelingSeats,
                autoCompute: action.autoCompute
            };
        case SettingAction.UpdateSettings:
            return {
                ...state,
                year: action.year,
                algorithm: action.algorithm,
                firstDivisor: action.firstDivisor,
                electionThreshold: action.electionThreshold,
                districtSeats: action.districtSeats,
                levelingSeats: action.levelingSeats
            };
        case SettingAction.ToggleAutoCompute:
            return {
                ...state,
                autoCompute: action.autoCompute
            }
        default:
            return state || unloadedState;
    }
};