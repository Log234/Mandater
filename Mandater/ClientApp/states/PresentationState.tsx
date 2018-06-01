import { PresentationType } from "../types/PresentationType";

export interface PresentationState {
    currentPresentation: PresentationType,
    decimals: string,
    decimalsNumber: number;
}

export const unloadedState: PresentationState = {
    currentPresentation: PresentationType.ElectionTable,
    decimals: "2",
    decimalsNumber: 2
};