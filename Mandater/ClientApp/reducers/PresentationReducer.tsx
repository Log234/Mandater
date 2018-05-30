import { PresentationState, unloadedState } from "../states/PresentationState";
import { Action, Reducer } from "redux";
import { InitializePresentationAction, ChangePresentationAction, PresentationAction as KnownAction } from "../actions/PresentationActions";
import { PresentationAction } from "../types/ActionTypes";
import { ApplicationState } from "../store";

export default function (state: ApplicationState, incomingAction: Action) {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case PresentationAction.InitializePresentation:
            console.log(`Action of type ${action.type} reduced`);
            return {
                ...state,
                currentPresentation: action.initialPresentation
            } as ApplicationState
        case PresentationAction.ChangePresentation:
            console.log(`Action of type ${action.type} reduced`);
            return {
                ...state,
                currentPresentation: action.presentationSelected
            } as ApplicationState
        default:
            console.log(`Action of type ${incomingAction.type} reduced to default`);
            return state || unloadedState
    }
}