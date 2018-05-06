
import * as UserInterface from "./UserInterface";
import { combineReducers } from "redux";
import { reducer } from "./UserInterface";
import { createStore } from "redux";
import * as ElectionReducer from "./ElectionReducer"
import { ElectionState } from "../interfaces/states/ElectionState"
import configureStore from "ClientApp/configureStore";

// The top-level state object
export interface ApplicationState {
    electionState : ElectionState
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    electionState: ElectionReducer.reducer
};

//export const store = createStore(reducers);
//console.log(store.getState(
// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
//export interface AppThunkAction<TAction> {
//    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
//}
