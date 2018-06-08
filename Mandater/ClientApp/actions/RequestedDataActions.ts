import { RequestedDataAction } from "../types/ActionTypes";
import { ElectionType } from "../interfaces/ElectionType";

export interface InitializeRequestedDataAction {
    type: RequestedDataAction.InitializeRequestedData;
    electionType: ElectionType;
    enableAutoSave: boolean;
}

export function initializeRequestedData(electionType: ElectionType): InitializeRequestedDataAction {
    const action: InitializeRequestedDataAction = {
        type: RequestedDataAction.InitializeRequestedData,
        electionType,
        enableAutoSave: true,
    };
    return action;
}