import axios from "axios";
import * as constants from "../constants"
import { AlgorithmPayload } from "../interfaces/AlgorithmPayload";
import { getAlgorithmType } from "../logic/AlgorithmUtils";
import { AlgorithmType } from "../enums/AlgorithmEnums";
import { PartyResultDictionary } from "../interfaces/PartyResultDictionary";
import { Election } from "../interfaces/Election";
import { computeAlgorithm } from "../logic/Algorithm";
import { InitializeParliamentaryElectionAction, UpdateCalculationAction, UpdateSettingsMenuAction, ToggleAutoComputeAction } from "../actions/ElectionActions";
import { SettingsMenuPayload } from "../interfaces/SettingsMenuPayload";
import { SettingsMenuPlaceholderPayload } from "../interfaces/SettingsMenuPlaceholderPayload";
import { validateFirstDivisor, validateElectionThreshold, validateLevelingSeats, validateDistrictSeats } from "../logic/Validation";

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
        firstDivisorPlaceholder: defaultElection.firstDivisor,
        electionThreshold: defaultElection.threshold,
        electionThresholdPlaceholder: defaultElection.threshold,
        districtSeats: defaultElection.seats,
        districtSeatsPlaceholder: defaultElection.seats,
        levelingSeats: defaultElection.levelingSeats,
        levelingSeatsPlaceholder: defaultElection.levelingSeats,
        autoCompute: true

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

export function updateSettingsMenu(payload: SettingsMenuPayload, placeholderPayload: SettingsMenuPlaceholderPayload) {
    let updateSettingsMenuAction: UpdateSettingsMenuAction = {
        type: constants.UPDATE_SETTINGSMENU,
        year: payload.year,
        algorithm: payload.algorithm,
        firstDivisor: payload.firstDivisor,
        firstDivisorPlaceholder: placeholderPayload.firstDivisor,
        electionThreshold: payload.electionThreshold,
        electionThresholdPlaceholder: placeholderPayload.electionThreshold,
        districtSeats: payload.districtSeats,
        districtSeatsPlaceholder: placeholderPayload.districtSeats,
        levelingSeats: payload.levelingSeats,
        levelingSeatsPlaceholder: placeholderPayload.levelingSeats
    };

    if (validateFirstDivisor(payload.firstDivisor)) {
        updateSettingsMenuAction.firstDivisorPlaceholder = payload.firstDivisor;
    }

    if (validateElectionThreshold(payload.electionThreshold)) {
        updateSettingsMenuAction.electionThresholdPlaceholder = payload.electionThreshold;
    }

    if (validateDistrictSeats(payload.districtSeats)) {
        updateSettingsMenuAction.districtSeatsPlaceholder = payload.districtSeats;
    }

    if (validateLevelingSeats(payload.levelingSeats)) {
        updateSettingsMenuAction.levelingSeatsPlaceholder = payload.levelingSeats;
    }

    return updateSettingsMenuAction;
}

export function toggleAutoCompute(autoCompute: boolean) {
    const toggleAutoComputeAction: ToggleAutoComputeAction = {
        type: constants.TOGGLE_AUTO_COMPUTE,
        autoCompute: autoCompute
    }
    return toggleAutoComputeAction;
}