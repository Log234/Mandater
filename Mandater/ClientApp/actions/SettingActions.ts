import { SettingAction } from "../types/ActionTypes";
import { ElectionType } from "../interfaces/ElectionType";
import { SettingsPayload } from "../interfaces/SettingsPayload";

export type InitializeSettingsAction = {
    type: SettingAction.InitializeSettings,
    electionYears: string[],
    year: string,
    algorithm: number,
    firstDivisor: string,
    electionThreshold: string,
    districtSeats: string,
    levelingSeats: string,
    autoCompute: boolean;
}

export interface UpdateSettingsAction {
    type: SettingAction.UpdateSettings,
    year: string,
    algorithm: number,
    firstDivisor: string,
    electionThreshold: string,
    districtSeats: string,
    levelingSeats: string,
}

export interface ToggleAutoComputeAction {
    type: SettingAction.ToggleAutoCompute,
    autoCompute: boolean;
}

export function initializeSettings(electionType: ElectionType) {
    const election = electionType.elections[0]; // Most recent election
    const electionYears: string[] = [];
    for (let currentElection of electionType.elections) {
        electionYears.push(currentElection.year.toString());
    }

    const initializeSettingsAction: InitializeSettingsAction = {
        type: SettingAction.InitializeSettings,
        electionYears: electionYears,
        year: election.year.toString(),
        algorithm: election.algorithm,
        firstDivisor: election.firstDivisor.toString(),
        electionThreshold: election.threshold.toString(),
        districtSeats: election.seats.toString(),
        levelingSeats: election.levelingSeats.toString(),
        autoCompute: true
    };
    return initializeSettingsAction;
}

export function updateSettings(settingsPayload: SettingsPayload) {
    const updateSettingsAction: UpdateSettingsAction = {
        type: SettingAction.UpdateSettings,
        year: settingsPayload.year,
        algorithm: settingsPayload.algorithm,
        firstDivisor: settingsPayload.firstDivisor,
        electionThreshold: settingsPayload.electionThreshold,
        districtSeats: settingsPayload.districtSeats,
        levelingSeats: settingsPayload.levelingSeats,
    };
    return updateSettingsAction;
}

export function toggleAutoCompute(autoCompute: boolean) {
    const toggleAutoComputeAction: ToggleAutoComputeAction = {
        type: SettingAction.ToggleAutoCompute,
        autoCompute: autoCompute
    };
    return toggleAutoComputeAction;
}