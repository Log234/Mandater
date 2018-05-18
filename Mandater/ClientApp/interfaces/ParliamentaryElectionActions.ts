import { Election } from "ClientApp/interfaces/Election";
import { ElectionType } from "./ElectionType"
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
    electionType: ElectionType,
    electionYears: number[],
    firstDivisor: number,
    partyResults: PartyResultDictionary;
}

export interface UpdateCalculationAction {
    type: constants.UPDATE_CALCULATION,
    partyResults: PartyResultDictionary;
}