import { Election } from "ClientApp/interfaces/Election";
import { PartyResult } from "ClientApp/interfaces/PartyResult";
import { PartyResultDictionary } from "ClientApp/interfaces/PartyResultDictionary";

export interface GetMenuDataAction {
    type: 'GET_MENU_DATA',
    electionYears: number[],
    firstDivisor: number,
    //algorithms: string[] // for more sensible code later
}

export interface InitializeParliamentaryElectionAction {
    type: 'INITIALIZE_PARLIAMENTARY_ELECTION',
    election: Election,
    electionYears: number[],
    firstDivisor: number,
    partyResults: PartyResultDictionary
}

export interface UpdateCalculationAction {
    type: 'UPDATE_CALCULATION',
    partyResults: PartyResultDictionary
}