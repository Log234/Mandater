import { TableState, TableMode } from "../interfaces/states/TableState";
import { Action, Reducer } from "redux";
import { InitializeTableAction, ChangeTableAction } from "../actions/TableActions";
import * as constants from "../constants"

type KnownAction = InitializeTableAction | ChangeTableAction;

const unloadedState: TableState = {
    tableMode : TableMode.ElectionOverview
}

export default function(state: TableState, incomingAction: Action) {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case constants.INITIALIZE_TABLE:
            console.log(`Action of type ${incomingAction.type} reduced`);
            return {
                ...state,
                tableMode: action.tableMode
            }
        case constants.CHANGE_TABLE:
            console.log(`Action of type ${incomingAction.type} reduced`);
            return {
                ...state,
                tableMode: action.tableMode
            }
        default:
            return state || unloadedState;
    }
}