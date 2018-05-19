import { ElectionType } from "./ElectionType"
import { PartyResultDictionary } from "ClientApp/interfaces/PartyResultDictionary";
import * as constants from "../constants";
import { AlgorithmType } from "../enums/AlgorithmEnums";

export interface GetMenuDataAction {
    type: constants.GET_MENU_DATA,
    electionYears: number[],
    selectedYear: number,
    algorithm: AlgorithmType,
    firstDivisor: number,
    electionThreshold: number,
    districtSeats: number,
    levelingSeats: number,
    algorithms: string[];
}

export type InitializeParliamentaryElectionAction =  {
    type: constants.INITIALIZE_PARLIAMENTARY_ELECTION,
    electionType: ElectionType,
    electionYears: number[],
    selectedYear: number,
    algorithm: AlgorithmType,
    firstDivisor: number,
    electionThreshold: number,
    districtSeats: number,
    levelingSeats: number,
    partyResults: PartyResultDictionary;
}

export interface UpdateCalculationAction {
    type: constants.UPDATE_CALCULATION,
    partyResults: PartyResultDictionary,
    selectedYear: number,
    algorithm: AlgorithmType,
    firstDivisor: number,
    electionThreshold: number,
    districtSeats: number,
    levelingSeats: number;
}