import { TableMode } from "../interfaces/states/TableState";
import { TableActionEnum as TableEnum } from "../enums/ActionTypeEnums";
// ACTION CREATORS
/**
 * 
 */
export interface ChangeTableAction {
    type: TableEnum.ChangeTable,
    tableMode: TableMode;
}
export interface InitializeTableAction {
    type: TableEnum.InitializeTable,
    tableMode: TableMode;
}
export function initializeTable() {
    const initializeAction: InitializeTableAction = {
        type: TableEnum.InitializeTable,
        tableMode: TableMode.ElectionOverview
    }
    console.log(`Action of type ${initializeAction.type} created`);
    return initializeAction;
}
export function changeTable(mode : TableMode) {
    const changeTableAction: ChangeTableAction = {
        type: TableEnum.ChangeTable,
        tableMode: mode
    }
    console.log(`Action of type ${changeTableAction.type} created`);
    return changeTableAction;
}