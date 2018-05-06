import { Election } from "ClientApp/interfaces/Election";
import { PartyResult } from "ClientApp/interfaces/PartyResult";
import { PartyResultDictionary } from "ClientApp/interfaces/PartyResultDictionary";
import * as constants from "../constants";

export interface GetMenuDataAction {
    type: constants.GET_MENU_DATA,
    electionYears: number[],
    firstDivisor: number,
    algorithms: string[];
}

export type InitializeParliamentaryElectionAction =  {
    type: constants.INITIALIZE_PARLIAMENTARY_ELECTION,
    election: Election,
    electionYears: number[],
    firstDivisor: number,
    partyResults: PartyResultDictionary;
}

export interface UpdateCalculationAction {
    type: constants.UPDATE_CALCULATION,
    partyResults: PartyResultDictionary;
}