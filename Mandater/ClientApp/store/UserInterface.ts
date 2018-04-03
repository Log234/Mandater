import { Action, Reducer, ActionCreator } from 'redux';

// STATES
export interface UserInterfaceState {
    showGraph: string;
}

// ACTIONS
interface ChangeGraphAction {
    type: 'CHANGE_GRAPH';
    showGraph: string;
}

type KnownAction = ChangeGraphAction;

// ACTION CREATORS

//TODO: Make action creators

// REDUCER
const unloadedState: UserInterfaceState = {
    showGraph: 'CountyTable'
}

// NB: BaseReducer Typescript (Reducer<State>) definition changes as of redux 4.0.0
// https://github.com/rt2zz/redux-persist/pull/778
export const reducer: Reducer<UserInterfaceState> = (state: UserInterfaceState, incomingAction: Action) => {
    // Include known action if applicable
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'CHANGE_GRAPH':
            console.log('State changed: ' + action.showGraph);
            return {
                showGraph: action.showGraph
            }
        default:
            return state || unloadedState;
    };
}