import { Action, Reducer, ActionCreator } from 'redux';

// STATES

export interface ParliamentElectionState {
    isLoading: boolean;
    electionYear: number;
    election: Election[];
}

export interface Election {
    electionYear: number;
    parties: Parties[];
    calculationMethod: string;
    firstDivisor: number;
    electionThreshold: number;
    levelingSeats: number;
}

export interface Parties {
    name: string;
    abbreviatedName: string;
}

// ACTIONS

interface RequestParliamentElectionAction {
    type: 'REQUEST_PARLIAMENT_ELECTION';
    electionYear: number;
}

interface ReceiveParliamentElectionAction {
    type: 'RECEIVE_PARLIAMENT_ELECTION';
    electionYear: number;
    election: Election[];
}

// TODO: Make actions for updates of elections etc...

type KnownAction = RequestParliamentElectionAction | ReceiveParliamentElectionAction;

// ACTION CREATORS

//TODO: Make action creators

// REDUCER

const unloadedState: ParliamentElectionState = {
    isLoading: false,
    electionYear: 2017,
    // TODO: Load default data
    election: []
}


// NB: BaseReducer Typescript (Reducer<State>) definition changes as of redux 4.0.0
// https://github.com/rt2zz/redux-persist/pull/778

export const reducer: Reducer<ParliamentElectionState> = (state: ParliamentElectionState, incomingAction: Action) => {
    // Include known action if applicable
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_PARLIAMENT_ELECTION':
            return {
                electionYear: state.electionYear,
                election: state.election,
                isLoading: true
            };
        case 'RECEIVE_PARLIAMENT_ELECTION':
            if (action.electionYear === state.electionYear) {
                return {
                    electionYear: state.electionYear,
                    election: state.election,
                    isLoading: false
                };
            }
            break;
        default:
            const exhaustiveCheck: never = action;
    };

    return state || unloadedState;
}