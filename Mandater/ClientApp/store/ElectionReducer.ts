﻿import { Action, Reducer } from "redux";
import { Election } from "ClientApp/interfaces/Election";
import { GetMenuDataAction, InitializeParliamentaryElectionAction, UpdateCalculationAction } from "ClientApp/interfaces/ParliamentaryElectionActions";
import axios from "axios";
import { ElectionAlgorithm } from "../logic/Algorithm";
import { PartyResultDictionary } from "ClientApp/interfaces/PartyResultDictionary";
import { ElectionState } from "ClientApp/interfaces/states/ElectionState";
import * as constants from "../constants"

// TODO: Make actions for updates of elections etc...

type KnownAction = GetMenuDataAction
    | InitializeParliamentaryElectionAction
    | UpdateCalculationAction;

// ACTION CREATORS

export async function initializeParliamentaryElectionData() {
    const electionYears: number[] = [];
    let defaultElection: any = {};
    let electionType: any = {};
    let defaultPartyResults: PartyResultDictionary = {};
    await axios.get("http://mandater-testing.azurewebsites.net/api/v1.0.0/no/pe?deep=true")
        .then(res => {
            electionType = res.data;
            const election: Election = electionType.elections[0]; // most recent
            for (let e of electionType.elections) {
                electionYears.push(e.year);
            }
            defaultElection = election;
            const electionAlgorithm = new ElectionAlgorithm(defaultElection);
            defaultPartyResults = electionAlgorithm.modifiedSaintLague();
        }).catch(error => {
            console.log(error);
        });
    
    const initializeAction: InitializeParliamentaryElectionAction = {
        type: constants.INITIALIZE_PARLIAMENTARY_ELECTION,
        electionType: electionType,
        partyResults: defaultPartyResults,
        electionYears: electionYears,
        firstDivisor: defaultElection.firstDivisor
    };
    console.log(`Initialized: ${electionYears}`);
    return initializeAction;
}

export function updateElectionData(election: Election, firstDivisor: number, electionThreshold: number, districtSeats: number, levellingSeats: number) {
    const electionAlgorithm = new ElectionAlgorithm(election);
    const results = electionAlgorithm.modifiedSaintLague();

    const updateCalculationAction: UpdateCalculationAction = {
        type: constants.UPDATE_CALCULATION,
        partyResults: results,
        firstDivisor: firstDivisor,
        electionThreshold: electionThreshold,
        districtSeats: districtSeats,
        levellingSeats: levellingSeats
    };
    return updateCalculationAction;
}

const unloadedState: ElectionState = {
    firstDivisor: -1,
    electionThreshold: -1,
    districSeats: -1,
    levellingSeats: -1,
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
    const action = incomingAction as KnownAction;
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
                electionThreshold: action.electionThreshold,
                districtSeats: action.districtSeats,
                levellingSeats: action.levellingSeats
            };
        case constants.UPDATE_CALCULATION:
            return {
                ...state,
                partyResults: action.partyResults,
                firstDivisor: action.firstDivisor,
                electionThreshold: action.electionThreshold,
                districtSeats: action.districtSeats,
                levellingSeats: action.levellingSeats
            };
        default:
            return state || unloadedState;
    }
    // ReSharper restore TsResolvedFromInaccessibleModule
};