import { ApplicationState } from "../store";
import { connect } from "react-redux";
import { SettingMenuComponent } from "../components/SettingMenuComponent";
import { updateElectionData, updateSettingsMenu, toggleAutoCompute } from "../actions/ElectionActionCreator";
import { validateSettings } from "../logic/Validation";
import { AlgorithmPayload } from "../interfaces/AlgorithmPayload";
import { SettingsMenuPayload } from "../interfaces/SettingsMenuPayload";
import { SettingsMenuPlaceholderPayload } from "../interfaces/SettingsMenuPlaceholderPayload";
import { ElectionType } from "../interfaces/ElectionType";
import { AlgorithmType } from "../types/Algorithms";
import { getAlgorithmType } from "../logic/AlgorithmUtils";

const mapStateToProps = (state: ApplicationState) => ({
    selectOptions: state.electionState.electionYears,
    payload: {
        year: state.electionState.year,
        electionType: state.electionState.electionType,
        algorithm: state.electionState.algorithm,
        firstDivisor: state.electionState.firstDivisor,
        electionThreshold: state.electionState.electionThreshold,
        districtSeats: state.electionState.districtSeats,
        levelingSeats: state.electionState.levelingSeats,
        autoCompute: state.electionState.autoCompute,
        clicked: false
    },
    placeholderPayload: {
        firstDivisor: state.electionState.firstDivisorPlaceholder,
        electionThreshold: state.electionState.electionThresholdPlaceholder,
        districtSeats: state.electionState.districtSeatsPlaceholder,
        levelingSeats: state.electionState.levelingSeatsPlaceholder
    }
});

const mapDispatchToProps = (dispatch: any) => ({
    updateCalculation: (settingsPayload: SettingsMenuPayload, placeholderPayload: SettingsMenuPlaceholderPayload) => {
        const election = settingsPayload.electionType.elections.find(element => element.year === settingsPayload.year);
        if ((settingsPayload.autoCompute || settingsPayload.forceCompute) && election !== undefined && validateSettings(settingsPayload)) {
            const payload: AlgorithmPayload = {
                election: election,
                year: settingsPayload.year,
                algorithm: settingsPayload.algorithm,
                firstDivisor: settingsPayload.firstDivisor,
                electionThreshold: settingsPayload.electionThreshold,
                districtSeats: settingsPayload.districtSeats,
                levelingSeats: settingsPayload.levelingSeats
            }
            const updateCalculationAction = updateElectionData(payload);
            dispatch(updateCalculationAction);
        }
        const updateSettingsMenuAction = updateSettingsMenu(settingsPayload, placeholderPayload);
        dispatch(updateSettingsMenuAction);
    },
    toggleAutoCompute: (isChecked: boolean) => {
        const toggleAutoComputeAction = toggleAutoCompute(isChecked);
        dispatch(toggleAutoComputeAction);
    },
    resetToHistoricalSettings: (settingsPayload: SettingsMenuPayload) => {
        const election = settingsPayload.electionType.elections.find(element => element.year === settingsPayload.year);
        if (election !== undefined) {
            const algorithmType = getAlgorithmType(election.algorithm);
            if (settingsPayload.autoCompute) {
                const payload: AlgorithmPayload = {
                    election: election,
                    year: settingsPayload.year,
                    algorithm: algorithmType,
                    firstDivisor: election.firstDivisor,
                    electionThreshold: election.threshold,
                    districtSeats: election.seats,
                    levelingSeats: election.levelingSeats
                }
                const updateCalculationAction = updateElectionData(payload);
                dispatch(updateCalculationAction);
            }

            const newSettingsPayload: SettingsMenuPayload = {
                ...settingsPayload,
                algorithm: algorithmType,
                firstDivisor: election.firstDivisor,
                electionThreshold: election.threshold,
                districtSeats: election.seats,
                levelingSeats: election.levelingSeats
            }
            const newPlaceholderPayload: SettingsMenuPlaceholderPayload = {
                firstDivisor: election.firstDivisor,
                electionThreshold: election.threshold,
                districtSeats: election.seats,
                levelingSeats: election.levelingSeats
            }
            const updateSettingsMenuAction = updateSettingsMenu(newSettingsPayload, newPlaceholderPayload);
            dispatch(updateSettingsMenuAction);
        }
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)((SettingMenuComponent) as any)