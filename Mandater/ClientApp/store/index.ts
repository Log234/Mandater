import ComputationReducer from "../reducers/ComputationReducer"
import { ComputationState } from "../states/ComputationState"
import { TableState } from "../states/TableState";
import { VisualizationState } from "../states/VisualizationState";
import TableReducer from "../reducers/TableReducer";
import { SettingsState } from "../states/SettingState";
import { RequestedDataState } from "../states/RequestedDataState";
import RequestedDataReducer from "../reducers/RequestedDataReducer";
import SettingsReducer from "../reducers/SettingsReducer";

// The top-level state object
export interface ApplicationState {
    SettingsState: SettingsState,
    ComputationState: ComputationState,
    RequestedDataState: RequestedDataState,
    TableState: TableState,
    VisualizationState: VisualizationState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    SettingsState: SettingsReducer,
    ComputationState: ComputationReducer,
    RequestedDataState: RequestedDataReducer,
    TableState: TableReducer
};

//export const store = createStore(reducers);
//console.log(store.getState(
// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
//export interface AppThunkAction<TAction> {
//    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
//}
