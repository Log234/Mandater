import { ApplicationState } from "../store";
import { connect } from "react-redux";
import { SettingMenuComponent } from "../components/SettingMenuComponent";
import { updateElectionData, updateSettingsMenu, toggleAutoCompute } from "../store/ElectionReducer";
import { validateSettings } from "../logic/Validation";
import { AlgorithmPayload } from "../interfaces/AlgorithmPayload";
import { SettingsMenuPayload } from "../interfaces/SettingsMenuPayload";
import { SettingsMenuPlaceholderPayload } from "../interfaces/SettingsMenuPlaceholderPayload";

const mapStateToProps = (state: ApplicationState) => ({
    selectOptions: state.electionState.electionYears,
    payload: {
        year: state.electionState.year,
        electionType: state.electionState.electionType,
        algorithm: state.electionState.algorithm,
        firstDivisor: state.electionState.firstDivisor,
        electionThreshold: state.electionState.electionThreshold,
        districtSeats: state.electionState.districSeats,
        levelingSeats: state.electionState.levelingSeats,
        autoCompute: state.electionState.autoCompute,
        clicked: false
    },
    placeholderPayload: {
        firstDivisor: state.electionState.firstDivisorPlaceholder,
        electionThreshold: state.electionState.electionThresholdPlaceholder,
        districtSeats: state.electionState.districSeatsPlaceholder,
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
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)((SettingMenuComponent) as any)