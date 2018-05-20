﻿import * as constants from "../constants"
import { TableMode } from "../interfaces/states/TableState";
// ACTION CREATORS
/**
 * 
 */
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