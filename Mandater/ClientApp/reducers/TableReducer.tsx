import { TableState, TableMode, unloadedState } from "../states/TableState";
import { Action, Reducer } from "redux";
import { InitializeTableAction, ChangeTableAction } from "../actions/TableActions";
import { TableAction } from "../types/ActionTypes";

type KnownAction = InitializeTableAction | ChangeTableAction;

export default function(state: TableState, incomingAction: Action) {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case TableAction.InitializeTable:
            console.log(`Action of type ${incomingAction.type} reduced`);
            return {
                ...state,
                tableMode: action.tableMode
            }
        case TableAction.ChangeTable:
            console.log(`Action of type ${incomingAction.type} reduced`);
            return {
                ...state,
                tableMode: action.tableMode
            }
        default:
            return state || unloadedState;
    }
}