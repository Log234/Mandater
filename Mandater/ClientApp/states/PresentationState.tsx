import { PresentationType } from "../types/PresentationType";

export interface PresentationState {
    currentPresentation: PresentationType,
}

export const unloadedState: PresentationState = {
    currentPresentation: PresentationType.ElectionTable
};