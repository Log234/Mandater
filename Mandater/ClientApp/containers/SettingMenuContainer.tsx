import { ApplicationState } from "../store";
import { connect } from "react-redux";
import { SettingMenuComponent, SettingMenuPayload } from "../components/SettingMenuComponent";
import { Election } from "../interfaces/Election";
import { updateElectionData } from "../store/ElectionReducer";
import * as Index from "react/index";
import { ElectionType } from "../interfaces/ElectionType";
import { validateNumber } from "../logic/Validation";
import { AlgorithmPayload } from "../interfaces/AlgorithmPayload";
import { AlgorithmType } from "../enums/AlgorithmEnums";

const mapStateToProps = (state: ApplicationState) => ({
    selectOptions: state.electionState.electionYears,
    selectedYear: state.electionState.selectedYear,
    firstDivisor: state.electionState.firstDivisor,
    electionThreshold: state.electionState.electionThreshold,
    districtSeats: state.electionState.districSeats,
    levelingSeats: state.electionState.levelingSeats,
    electionType: state.electionState.electionType
});

const mapDispatchToProps = (dispatch: any) => ({
    updateCalculation: (incomingPayload : SettingMenuPayload) => {
        console.log(`Selected: ${incomingPayload.year}`);

        if (!validateNumber(incomingPayload.firstDivisor, 1, 5, false)
            && !validateNumber(incomingPayload.electionThreshold, 0, 15, false)
            && !validateNumber(incomingPayload.levelingSeats, 0, 100, true)) {
            return;
        }

        let algorithmType: AlgorithmType = AlgorithmType.SainteLague;
        if (incomingPayload.algorithm === "DH") {
            algorithmType = AlgorithmType.DHondt;
        }

        let election = incomingPayload.electionType.elections.find(element => element.year === incomingPayload.year);
        if (election !== undefined) {
            const payload: AlgorithmPayload = {
                election: election,
                algorithm: algorithmType,
                firstDivisor: incomingPayload.firstDivisor,
                electionThreshold: incomingPayload.electionThreshold,
                districtSeats: incomingPayload.districtSeats,
                levelingSeats: incomingPayload.levelingSeats
            }
            let updateCalculationAction = updateElectionData(payload);
            dispatch(updateCalculationAction);
            console.log(`Updated: ${incomingPayload.year}`);
        }
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)((SettingMenuComponent) as any)