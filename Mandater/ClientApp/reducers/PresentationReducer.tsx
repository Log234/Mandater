import { unloadedState } from "../states/PresentationState";
import { Action } from "redux";
import { PresentationAction as KnownAction } from "../actions/PresentationActions";
import { PresentationAction } from "../types/ActionTypes";
import { ApplicationState } from "../store";

export default function (state: ApplicationState, incomingAction: Action) {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case PresentationAction.InitializePresentation:
            console.log(`Action of type ${action.type} reduced`);
            return {
                ...state,
                currentPresentation: action.initialPresentation,
                decimals: action.decimals,
                decimalsNumber: action.decimalsNumber
            } as ApplicationState;
        case PresentationAction.ChangePresentation:
            console.log(`Action of type ${action.type} reduced`);
            return {
                ...state,
                currentPresentation: action.presentationSelected
            } as ApplicationState;
        case PresentationAction.ChangeDecimals:
            console.log(`Action of type ${action.type} reduced`);
            return {
                ...state,
                decimals: action.decimals,
                decimalsNumber: action.decimalsNumber
            } as ApplicationState;
        default:
            console.log(`Action of type ${incomingAction.type} reduced to default`);
            return state || unloadedState;
    }
}