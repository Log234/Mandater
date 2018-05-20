import { ApplicationState } from "../store";
import { connect } from "react-redux";
import { SettingMenuComponent } from "../components/SettingMenuComponent";
import { updateElectionData, updateSettingsMenu } from "../store/ElectionReducer";
import { validateSettings } from "../logic/Validation";
import { AlgorithmPayload } from "../interfaces/AlgorithmPayload";
import { SettingsMenuPayload } from "../interfaces/SettingsMenuPayload";

const mapStateToProps = (state: ApplicationState) => ({
    selectOptions: state.electionState.electionYears,
    payload: {
        year: state.electionState.year,
        electionType: state.electionState.electionType,
        algorithm: state.electionState.algorithm,
        firstDivisor: state.electionState.firstDivisor,
        electionThreshold: state.electionState.electionThreshold,
        districtSeats: state.electionState.districSeats,
        levelingSeats: state.electionState.levelingSeats
    }
});

const mapDispatchToProps = (dispatch: any) => ({
    updateCalculation: (settingsPayload : SettingsMenuPayload) => {
        const election = settingsPayload.electionType.elections.find(element => element.year === settingsPayload.year);
        const settingsAreValid = validateSettings(settingsPayload);

        if (election !== undefined && settingsAreValid) {
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

        const updateSettingsMenuAction = updateSettingsMenu(settingsPayload);
        dispatch(updateSettingsMenuAction);
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)((SettingMenuComponent) as any)