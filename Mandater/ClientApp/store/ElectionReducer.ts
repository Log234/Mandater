import { Action, Reducer, ActionCreator } from "redux";
import { Election } from "ClientApp/interfaces/Election";
import { GetMenuDataAction, InitializeParliamentaryElectionAction, UpdateCalculationAction } from "ClientApp/interfaces/ParliamentaryElectionActions";
import axios, { AxiosRequestConfig, AxiosPromise } from "axios";
import { ElectionType } from "ClientApp/interfaces/ElectionType";
import { ElectionAlgorithm } from "../logic/Algorithm";
import { PartyResult } from "ClientApp/interfaces/PartyResult";
import { PartyResultDictionary } from "ClientApp/interfaces/PartyResultDictionary";
import { ElectionState } from "ClientApp/interfaces/states/ElectionState";
import { time } from "console";
import * as constants from "../constants"

// TODO: Make actions for updates of elections etc...

type KnownAction = GetMenuDataAction
    | InitializeParliamentaryElectionAction
    | UpdateCalculationAction;

// ACTION CREATORS

export async function initializeParliamentaryElectionData() {
    let electionYears: number[] = [];
    let defaultElection: any = {};
    let electionType: any = {};
    let defaultPartyResults: PartyResultDictionary = {};
    await axios.get("http://localhost:58932/api/v1.0.0/no/pe?deep=true")
        .then(res => {
            electionType = res.data;
            let election: Election = electionType.elections[electionType.elections.length - 1]; // most recent
            for (let e of electionType.elections) {
                electionYears.push(e.year);
                console.log(`${e.year} ${electionYears.length}`);
            }
            defaultElection = election;
            let electionAlgorithm = new ElectionAlgorithm(defaultElection);
            defaultPartyResults = electionAlgorithm.modifiedSaintLague();
        }).catch(error => {
            console.log(error);
        });
    
    let initializeAction: InitializeParliamentaryElectionAction = {
        type: constants.INITIALIZE_PARLIAMENTARY_ELECTION,
        electionType: electionType,
        partyResults: defaultPartyResults,
        electionYears: electionYears,
        firstDivisor: defaultElection.firstDivisor
    };
    console.log(`Initialized: ${electionYears}`);
    return initializeAction;
}

export function updateElectionData(election: Election) {
    let electionAlgorithm = new ElectionAlgorithm(election);
    let results = electionAlgorithm.modifiedSaintLague();

    let updateCalculationAction: UpdateCalculationAction = {
        type: constants.UPDATE_CALCULATION,
        partyResults: results
    }
    return updateCalculationAction;
}

const unloadedState: ElectionState = {
    firstDivisor: -1,
    electionYears: [],
    electionType: {
        countryId: -1,
        electionTypeId: -1,
        internationalName: "",
        elections: []
    },
    partyResults: {}
};


// NB: BaseReducer Typescript (Reducer<State>) definition changes as of redux 4.0.0
// https://github.com/rt2zz/redux-persist/pull/778


// ReSharper disable TsResolvedFromInaccessibleModule
export const reducer: Reducer<ElectionState> = (state: ElectionState, incomingAction: Action) => {
    // Include known action if applicable
    let action: KnownAction = incomingAction as KnownAction;
    switch (action.type) {
        case constants.INITIALIZE_PARLIAMENTARY_ELECTION:
            return {
                ...state, 
                electionType: action.electionType,
                electionYears: action.electionYears,
                firstDivisor: action.firstDivisor,
                partyResults: action.partyResults
            };
        case constants.GET_MENU_DATA:
            return {
                ...state,
                electionYears: action.electionYears,
                firstDivisor: action.firstDivisor,
            };
        case constants.UPDATE_CALCULATION:
            return {
                ...state,
                partyResults: action.partyResults
            };
        default:
            return state || unloadedState;
    }
    // ReSharper restore TsResolvedFromInaccessibleModule
};