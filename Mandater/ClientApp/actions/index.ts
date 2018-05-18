import * as constants from "../constants"
import { TableMode } from "../interfaces/states/TableState";
// ACTION CREATORS
/**
 * 
 */
export interface InitializePresentationAction {
    type: constants.INITIALIZE_PRESENTATION,
    tableMode: TableMode;
}
export function initializePresentation() {
    const initializeAction: InitializePresentationAction = {
        type: constants.INITIALIZE_PRESENTATION,
        tableMode: TableMode.ElectionOverview
    }
    console.log(`Action of type ${initializeAction.type} created`);
    return initializeAction;
}