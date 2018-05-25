import { TableState, TableMode } from "../interfaces/states/TableState";
import { Action, Reducer } from "redux";
import { InitializeTableAction, ChangeTableAction } from "../actions/TableActions";
import { TableActionEnum } from "../enums/ActionTypeEnums";

type KnownAction = InitializeTableAction | ChangeTableAction;

const unloadedState: TableState = {
    tableMode : TableMode.ElectionOverview
}

export default function(state: TableState, incomingAction: Action) {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case TableActionEnum.InitializeTable:
            console.log(`Action of type ${incomingAction.type} reduced`);
            return {
                ...state,
                tableMode: action.tableMode
            }
        case TableActionEnum.ChangeTable:
            console.log(`Action of type ${incomingAction.type} reduced`);
            return {
                ...state,
                tableMode: action.tableMode
            }
        default:
            return state || unloadedState;
    }
}