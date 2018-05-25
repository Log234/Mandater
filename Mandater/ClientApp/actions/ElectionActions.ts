import { ElectionType } from "../interfaces/ElectionType"
import { PartyResultDictionary } from "ClientApp/interfaces/PartyResultDictionary";
import { AlgorithmType } from "../types/Algorithms";
import { ElectionAction as ElectionAction } from "../types/ActionTypes";

export interface GetMenuDataAction {
    type: ElectionAction.GetMenuData,
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
    type: ElectionAction.InitializeParliamentaryElection,
    electionType: ElectionType,
    electionYears: number[],
    year: number,
    algorithm: AlgorithmType,
    firstDivisor: number,
    firstDivisorPlaceholder: number,
    electionThreshold: number,
    electionThresholdPlaceholder: number,
    districtSeats: number,
    districtSeatsPlaceholder: number,
    levelingSeats: number,
    levelingSeatsPlaceholder: number;
    partyResults: PartyResultDictionary,
    autoCompute: boolean;
}

export interface UpdateCalculationAction {
    type: ElectionAction.UpdateCalculation,
    partyResults: PartyResultDictionary
}

export interface UpdateSettingsMenuAction {
    type: ElectionAction.UpdateSettingsMenu,
    year: number,
    algorithm: AlgorithmType,
    firstDivisor: number,
    firstDivisorPlaceholder: number,
    electionThreshold: number,
    electionThresholdPlaceholder: number,
    districtSeats: number,
    districtSeatsPlaceholder: number,
    levelingSeats: number,
    levelingSeatsPlaceholder: number;
}

export interface ToggleAutoComputeAction {
    type: ElectionAction.ToggleAutoCompute,
    autoCompute: boolean;
}