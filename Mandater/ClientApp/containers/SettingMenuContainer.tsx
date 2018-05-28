import { ApplicationState } from "../store";
import { connect } from "react-redux";
import { SettingMenuComponent } from "../components/SettingMenuComponent";
import { updateElectionData } from "../actions/ComputationActions";
import { updateSettings, toggleAutoCompute } from "../actions/SettingActions";
import { ComputationPayload } from "../interfaces/ComputationPayload";
import { SettingsPayload } from "../interfaces/SettingsPayload";
import { getAlgorithmType } from "../logic/AlgorithmUtils";
import { Election } from "../interfaces/Election";

const mapStateToProps = (state: ApplicationState) => ({
    computationPayload: {
        election: state.ComputationState.election,
        algorithm: state.ComputationState.algorithm,
        firstDivisor: state.ComputationState.firstDivisor,
        electionThreshold: state.ComputationState.electionThreshold,
        districtSeats: state.ComputationState.districtSeats,
        levelingSeats: state.ComputationState.levelingSeats
    } as ComputationPayload,
    settingsPayload: {
        electionYears: state.SettingsState.electionYears,
        year: state.SettingsState.year,
        algorithm: state.SettingsState.algorithm,
        firstDivisor: state.SettingsState.firstDivisor,
        electionThreshold: state.SettingsState.electionThreshold,
        districtSeats: state.SettingsState.districtSeats,
        levelingSeats: state.SettingsState.levelingSeats,
        autoCompute: state.SettingsState.autoCompute,
        forceCompute: false
    } as SettingsPayload,
    electionType: state.RequestedDataState.electionType
});

const mapDispatchToProps = (dispatch: any) => ({
    updateCalculation: (computationPayload: ComputationPayload, autoCompute: boolean, forceCompute: boolean) => {
        console.log(`Force: ${forceCompute}`);
        if (autoCompute || forceCompute) {
            const payload: ComputationPayload = {
                election: computationPayload.election,
                algorithm: computationPayload.algorithm,
                firstDivisor: computationPayload.firstDivisor,
                electionThreshold: computationPayload.electionThreshold,
                districtSeats: computationPayload.districtSeats,
                levelingSeats: computationPayload.levelingSeats
            }
            const updateCalculationAction = updateElectionData(payload);
            dispatch(updateCalculationAction);
        }
    },
    updateSettings: (settingsPayload: SettingsPayload) => {
        const updateSettingsAction = updateSettings(settingsPayload);
        dispatch(updateSettingsAction);
    },
    toggleAutoCompute: (isChecked: boolean) => {
        const toggleAutoComputeAction = toggleAutoCompute(isChecked);
        dispatch(toggleAutoComputeAction);
    },
    resetToHistoricalSettings: (settingsPayload: SettingsPayload, election: Election) => {
        if (settingsPayload.autoCompute) {
            const payload: ComputationPayload = {
                election: election,
                algorithm: getAlgorithmType(election.algorithm),
                firstDivisor: election.firstDivisor,
                electionThreshold: election.threshold,
                districtSeats: election.seats,
                levelingSeats: election.levelingSeats
            }
            const updateCalculationAction = updateElectionData(payload);
            dispatch(updateCalculationAction);
        }

        const newSettingsPayload: SettingsPayload = {
            ...settingsPayload,
            algorithm: election.algorithm,
            firstDivisor: election.firstDivisor.toString(),
            electionThreshold: election.threshold.toString(),
            districtSeats: election.seats.toString(),
            levelingSeats: election.levelingSeats.toString()
        }
        const updateSettingsAction = updateSettings(newSettingsPayload);
        dispatch(updateSettingsAction);
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)((SettingMenuComponent) as any)