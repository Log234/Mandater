﻿import { PresentationAction } from "../types/ActionTypes";
import { PresentationType } from "../types/PresentationType";

export interface ChangePresentationAction {
    type: PresentationAction.ChangePresentation;
    presentationSelected: PresentationType;
}
export interface InitializePresentationAction {
    type: PresentationAction.InitializePresentation;
    initialPresentation: PresentationType;
    decimals: string;
    decimalsNumber: number;
    showPartiesWithoutSeats: boolean;
}
export interface ChangeDecimalsAction {
    type: PresentationAction.ChangeDecimals;
    decimals: string;
    decimalsNumber: number;
}
export interface ChangeShowPartiesNoSeat {
    type: PresentationAction.ShowPartiesNoSeats;
    showPartiesWithoutSeats: boolean;
}

export type PresentationAction = ChangePresentationAction
    | InitializePresentationAction
    | ChangeDecimalsAction
    | ChangeShowPartiesNoSeat;

export function initializePresentation() {
    const action = {
        type: PresentationAction.InitializePresentation,
        initialPresentation: PresentationType.ElectionTable,
        decimals: "2",
        decimalsNumber: 2,
        showPartiesWithoutSeats: false
    } as InitializePresentationAction;
    console.log(`Action of type ${action.type} created`);
    return action;
}
export function changePresentation(presentationSelected: PresentationType) {
    const action = {
        type: PresentationAction.ChangePresentation,
        presentationSelected
    } as ChangePresentationAction;
    console.log(`Action of type ${action.type} created`);
    return action;
}