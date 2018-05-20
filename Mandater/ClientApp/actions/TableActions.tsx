import * as constants from "../constants"
import { TableMode } from "../interfaces/states/TableState";
// ACTION CREATORS
/**
 * 
 */
export interface ChangeTableAction {
    type: constants.CHANGE_TABLE,
    tableMode: TableMode
}
export interface InitializeTableAction {
    type: constants.INITIALIZE_TABLE,
    tableMode: TableMode;
}
export function initializeTable() {
    const initializeAction: InitializeTableAction = {
        type: constants.INITIALIZE_TABLE,
        tableMode: TableMode.ElectionOverview
    }
    console.log(`Action of type ${initializeAction.type} created`);
    return initializeAction;
}
export function changeTable(mode : TableMode) {
    const changeTableAction: ChangeTableAction = {
        type: constants.CHANGE_TABLE,
        tableMode: mode
    }
    console.log(`Action of type ${changeTableAction.type} created`);
    return changeTableAction;
}