import { TableState, TableMode } from "../interfaces/states/TableState";
import { Action, Reducer } from "redux";
import { InitializePresentationAction } from "ClientApp/actions";
import * as constants from "../constants"

type KnownAction = InitializePresentationAction

const unloadedState: TableState = {
    tableMode : TableMode.ElectionOverview
}

export default function(state: TableState, incomingAction: Action) {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case constants.INITIALIZE_PRESENTATION:
            console.log(`Action of type ${incomingAction.type} reduced`);
            return {
                ...state,
                tableMode: action.tableMode
            }
        default:
            return state || unloadedState;
    }
}