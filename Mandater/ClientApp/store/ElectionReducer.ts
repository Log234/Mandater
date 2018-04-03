﻿import { Action, Reducer, ActionCreator } from 'redux';
import { Election } from 'ClientApp/interfaces/Election';
import { GetMenuDataAction, InitializeParliamentaryElectionAction, UpdateCalculationAction } from 'ClientApp/interfaces/ParliamentaryElectionActions';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { ElectionType } from 'ClientApp/interfaces/ElectionType';
import { ElectionAlgorithm } from '../logic/Algorithm';
import { PartyResult } from 'ClientApp/interfaces/PartyResult';
import { PartyResultDictionary } from 'ClientApp/interfaces/PartyResultDictionary';
import { ElectionState } from 'ClientApp/interfaces/states/ElectionState';

// TODO: Make actions for updates of elections etc...

type KnownAction = GetMenuDataAction
    | InitializeParliamentaryElectionAction
    | UpdateCalculationAction;

// ACTION CREATORS

export function initializeParliamentaryElectionData() {
    let electionYears: number[] = [];
    let defaultElection: any = {};
    let defaultPartyResults: PartyResultDictionary = {}
    axios.get("http://mandater-testing.azurewebsites.net/api/v1.0.0/no?deep=true")
        .then(res => {
            let electionType: ElectionType = res.data[0];
            let election: Election = electionType.elections[electionType.elections.length - 1]; // most recent
            if (electionType == null) {
                console.log(electionType + " is an invalid election");
            } else {
                for (let e of electionType.elections) {
                    electionYears.push(e.year);
                    console.log(e.year);
                }
                let defaultElection: Election = election;
                let electionAlgorithm: ElectionAlgorithm = new ElectionAlgorithm(defaultElection);
                defaultPartyResults = electionAlgorithm.modifiedSaintLague();
            }
        }).catch(error => {
            console.log(error);
        });
    let initializeAction: InitializeParliamentaryElectionAction = {
        type: "INITIALIZE_PARLIAMENTARY_ELECTION",
        election: defaultElection,
        partyResults: defaultPartyResults,
        electionYears: electionYears,
        firstDivisor: defaultElection.firstDivisor
    }

    return initializeAction;
}

export function updateElectionData(election: Election) {

}

const unloadedState: ElectionState = {
    election : {
        algorithm: -1,
        counties: [],
        countryId: -1,
        electionId: -1,
        electionTypeId: -1,
        firstDivisor: -1,
        levelingSeats: -1,
        seats: -1,
        threshold: -1,
        year: -1
    },
    electionYears: [],
    firstDivisor: -1,
    partyResults: {}
}


// NB: BaseReducer Typescript (Reducer<State>) definition changes as of redux 4.0.0
// https://github.com/rt2zz/redux-persist/pull/778

export const reducer: Reducer<ElectionState> = (state: ElectionState, incomingAction: Action) => {
    // Include known action if applicable
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case "INITIALIZE_PARLIAMENTARY_ELECTION":
            return {
                election: action.election,
                electionYears: action.electionYears,
                firstDivisor: action.firstDivisor,
                partyResults: action.partyResults
            }
        case "GET_MENU_DATA":
            return {
                election: state.election,
                electionYears: action.electionYears,
                firstDivisor: action.firstDivisor,
                partyResults: state.partyResults
            }
        case "UPDATE_CALCULATION":
            return {
                election: state.election,
                electionYears: state.electionYears,
                firstDivisor: state.firstDivisor,
                partyResults: action.partyResults
            }
        default:
            return state || unloadedState;
    };

}