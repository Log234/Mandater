import { PresentationType } from "../types/PresentationType";

export interface PresentationState {
    currentPresentation: PresentationType,
    decimals: string;
}

export const unloadedState: PresentationState = {
    currentPresentation: PresentationType.ElectionTable,
    decimals: "2"
};