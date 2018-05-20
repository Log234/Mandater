import * as ElectionReducer from "./ElectionReducer"
import { ElectionState } from "../interfaces/states/ElectionState"
import { TableState } from "../interfaces/states/TableState";
import { VisualizationState } from "../interfaces/states/VisualizationState";
import TableReducer from "../reducers/TableReducer";

// The top-level state object
export interface ApplicationState {
    electionState: ElectionState,
    tableState: TableState,
    visualizationState: VisualizationState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    electionState: ElectionReducer.reducer,
    tableState: TableReducer
};

//export const store = createStore(reducers);
//console.log(store.getState(
// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
//export interface AppThunkAction<TAction> {
//    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
//}
