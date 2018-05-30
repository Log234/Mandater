import { PresentationAction } from "../types/ActionTypes";
import { PresentationType } from "../types/PresentationType";
// ACTION CREATORS
/**
 * 
 */
export interface ChangePresentationAction {
    type: PresentationAction.ChangePresentation,
    presentationSelected: PresentationType;
}
export interface InitializePresentationAction {
    type: PresentationAction.InitializePresentation,
    initialPresentation: PresentationType;
}

export type PresentationAction = ChangePresentationAction | InitializePresentationAction

export function initializePresentation() {
    const action = {
        type: PresentationAction.InitializePresentation,
        initialPresentation: PresentationType.ElectionTable
    } as InitializePresentationAction
    console.log(`Action of type ${action.type} created`);
    return action;
}
export function changePresentation(presentationSelected : PresentationType) {
    const action = {
        type: PresentationAction.ChangePresentation,
        presentationSelected
    } as ChangePresentationAction
    console.log(`Action of type ${action.type} created`);
    return action;
}