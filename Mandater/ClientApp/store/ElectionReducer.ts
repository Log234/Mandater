﻿import { Action, Reducer } from "redux";
import { Election } from "ClientApp/interfaces/Election";
import { GetMenuDataAction, InitializeParliamentaryElectionAction, UpdateCalculationAction, UpdateSettingsMenuAction } from "ClientApp/interfaces/ParliamentaryElectionActions";
import axios from "axios";
import { PartyResultDictionary } from "ClientApp/interfaces/PartyResultDictionary";
import { ElectionState } from "ClientApp/interfaces/states/ElectionState";
import * as constants from "../constants"
import { AlgorithmType } from "../enums/AlgorithmEnums";
import { AlgorithmPayload } from "../interfaces/AlgorithmPayload";
import { computeAlgorithm } from "../logic/Algorithm";
import { getAlgorithmType } from "../logic/AlgorithmUtils";
import { SettingsMenuPayload } from "../interfaces/SettingsMenuPayload";

// TODO: Make actions for updates of elections etc...

type KnownAction = GetMenuDataAction
                   | InitializeParliamentaryElectionAction
                   | UpdateCalculationAction
                   | UpdateSettingsMenuAction;

// ACTION CREATORS

export async function initializeParliamentaryElectionData() {
    const electionYears: number[] = [];
    let defaultElection: any = {};
    let electionType: any = {};
    let algorithmType: AlgorithmType = AlgorithmType.SainteLague;
    let defaultPartyResults: PartyResultDictionary = {};
    await axios.get("http://mandater-testing.azurewebsites.net/api/v1.0.0/no/pe?deep=true")
        .then(res => {
            electionType = res.data;
            const election: Election = electionType.elections[0]; // most recent
            for (let e of electionType.elections) {
                electionYears.push(e.year);
            }
            defaultElection = election;
            algorithmType = getAlgorithmType(election.algorithm);
            const payload: AlgorithmPayload = {
                election: election,
                year: election.year,
                algorithm: algorithmType,
                firstDivisor: election.firstDivisor,
                electionThreshold: election.threshold,
                districtSeats: election.seats,
                levelingSeats: election.levelingSeats
            }
            defaultPartyResults = computeAlgorithm(payload);
        }).catch(error => {
            console.log(error);
        });

    const initializeAction: InitializeParliamentaryElectionAction = {
        type: constants.INITIALIZE_PARLIAMENTARY_ELECTION,
        electionType: electionType,
        partyResults: defaultPartyResults,
        electionYears: electionYears,
        year: defaultElection.year,
        algorithm: algorithmType,
        firstDivisor: defaultElection.firstDivisor,
        electionThreshold: defaultElection.threshold,
        districtSeats: defaultElection.seats,
        levelingSeats: defaultElection.levelingSeats
        
    };
    console.log(`Initialized: ${electionYears}`);
    return initializeAction;
}

export function updateElectionData(payload: AlgorithmPayload) {
    const results = computeAlgorithm(payload);

    const updateCalculationAction: UpdateCalculationAction = {
        type: constants.UPDATE_CALCULATION,
        partyResults: results
    };
    return updateCalculationAction;
}

export function updateSettingsMenu(payload: SettingsMenuPayload) {
    const updateSettingsMenuAction: UpdateSettingsMenuAction = {
        type: constants.UPDATE_SETTINGSMENU,
        year: payload.year,
        algorithm: payload.algorithm,
        firstDivisor: payload.firstDivisor,
        electionThreshold: payload.electionThreshold,
        districtSeats: payload.districtSeats,
        levelingSeats: payload.levelingSeats
    };
    return updateSettingsMenuAction;
}

const unloadedState: ElectionState = {
    electionYears: [],
    year: -1,
    firstDivisor: -1,
    algorithm: AlgorithmType.Undefined,
    electionThreshold: -1,
    districSeats: -1,
    levelingSeats: -1,
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
                year: action.year,
                algorithm: action.algorithm,
                firstDivisor: action.firstDivisor,
                electionThreshold: action.electionThreshold,
                districSeats: action.districtSeats,
                levelingSeats: action.levelingSeats,
                partyResults: action.partyResults
            };
        case constants.GET_MENU_DATA:
            return {
                ...state,
                electionYears: action.electionYears,
                year: action.selectedYear,
                firstDivisor: action.firstDivisor,
                electionThreshold: action.electionThreshold,
                districtSeats: action.districtSeats,
                levelingSeats: action.levelingSeats
            };
        case constants.UPDATE_CALCULATION:
            return {
                ...state,
                partyResults: action.partyResults,
            };
        case constants.UPDATE_SETTINGSMENU:
            return {
                ...state,
                year: action.year,
                algorithm: action.algorithm,
                firstDivisor: action.firstDivisor,
                electionThreshold: action.electionThreshold,
                districtSeats: action.districtSeats,
                levelingSeats: action.levelingSeats
            };
        default:
            return state || unloadedState;
    }
    // ReSharper restore TsResolvedFromInaccessibleModule
};