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
        election: state.computationState.election,
        algorithm: state.computationState.algorithm,
        firstDivisor: state.computationState.firstDivisor,
        electionThreshold: state.computationState.electionThreshold,
        districtSeats: state.computationState.districtSeats,
        levelingSeats: state.computationState.levelingSeats
    } as ComputationPayload,
    settingsPayload: {
        electionYears: state.settingsState.electionYears,
        year: state.settingsState.year,
        algorithm: state.settingsState.algorithm,
        firstDivisor: state.settingsState.firstDivisor,
        electionThreshold: state.settingsState.electionThreshold,
        districtSeats: state.settingsState.districtSeats,
        levelingSeats: state.settingsState.levelingSeats,
        autoCompute: state.settingsState.autoCompute,
        forceCompute: false
    } as SettingsPayload,
    electionType: state.requestedDataState.electionType
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
            };
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
            };
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
        };
        const updateSettingsAction = updateSettings(newSettingsPayload);
        dispatch(updateSettingsAction);
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)((SettingMenuComponent) as any)