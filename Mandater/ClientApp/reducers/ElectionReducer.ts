import { Action, Reducer } from "redux";
import { ElectionState, unloadedState } from "../interfaces/states/ElectionState";
import { GetMenuDataAction, InitializeParliamentaryElectionAction, UpdateCalculationAction, UpdateSettingsMenuAction, ToggleAutoComputeAction } from "../actions/ElectionActions";
import { ElectionActionEnum as ElectionActionEnum } from "../enums/ActionTypeEnums";

// TODO: Make actions for updates of elections etc...

type KnownAction = GetMenuDataAction
                   | InitializeParliamentaryElectionAction
                   | UpdateCalculationAction
                   | UpdateSettingsMenuAction
                   | ToggleAutoComputeAction;

// NB: BaseReducer Typescript (Reducer<State>) definition changes as of redux 4.0.0
// https://github.com/rt2zz/redux-persist/pull/778


// ReSharper disable TsResolvedFromInaccessibleModule
export const reducer: Reducer<ElectionState> = (state: ElectionState, incomingAction: Action) => {
    // Include known action if applicable
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case ElectionActionEnum.InitializeParliamentaryElection:
            return {
                ...state,
                electionType: action.electionType,
                electionYears: action.electionYears,
                year: action.year,
                algorithm: action.algorithm,
                firstDivisor: action.firstDivisor,
                firstDivisorPlaceholder: action.firstDivisorPlaceholder,
                electionThreshold: action.electionThreshold,
                electionThresholdPlaceholder: action.electionThresholdPlaceholder,
                districtSeats: action.districtSeats,
                districtSeatsPlaceholder: action.districtSeatsPlaceholder,
                levelingSeats: action.levelingSeats,
                levelingSeatsPlaceholder: action.levelingSeatsPlaceholder,
                partyResults: action.partyResults,
                autoCompute: action.autoCompute
            };
        case ElectionActionEnum.GetMenuData:
            return {
                ...state,
                electionYears: action.electionYears,
                year: action.selectedYear,
                firstDivisor: action.firstDivisor,
                electionThreshold: action.electionThreshold,
                districtSeats: action.districtSeats,
                levelingSeats: action.levelingSeats
            };
        case ElectionActionEnum.UpdateCalculation:
            return {
                ...state,
                partyResults: action.partyResults,
            };
        case ElectionActionEnum.UpdateSettingsMenu:
            return {
                ...state,
                year: action.year,
                algorithm: action.algorithm,
                firstDivisor: action.firstDivisor,
                firstDivisorPlaceholder: action.firstDivisorPlaceholder,
                electionThreshold: action.electionThreshold,
                electionThresholdPlaceholder: action.electionThresholdPlaceholder,
                districtSeats: action.districtSeats,
                districtSeatsPlaceholder: action.districtSeatsPlaceholder,
                levelingSeats: action.levelingSeats,
                levelingSeatsPlaceholder: action.levelingSeatsPlaceholder
            };
        case ElectionActionEnum.ToggleAutoCompute:
            return {
                ...state,
                autoCompute: action.autoCompute
            };
        default:
            return state || unloadedState;
    }
    // ReSharper restore TsResolvedFromInaccessibleModule
};