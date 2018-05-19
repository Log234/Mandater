import { ApplicationState } from "../store";
import { connect } from "react-redux";
import { SettingMenuComponent } from "../components/SettingMenuComponent";
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
    updateCalculation: (year: number, electionType: ElectionType, algorithm: string, firstDivisor: number, electionThreshold: number, districtSeats: number, levelingSeats: number) => {
        console.log(`Selected: ${year}`);

        if (!validateNumber(firstDivisor, 1)) {
            return;
        }

        let algorithmType: AlgorithmType = AlgorithmType.SainteLague;
        if (algorithm === "DH") {
            algorithmType = AlgorithmType.DHondt;
        }

        let election = electionType.elections.find(element => element.year === year);
        if (election !== undefined) {
            const payload: AlgorithmPayload = {
                election: election,
                algorithm: algorithmType,
                firstDivisor: firstDivisor,
                electionThreshold: electionThreshold,
                districtSeats: districtSeats,
                levelingSeats: levelingSeats
            }
            let updateCalculationAction = updateElectionData(payload);
            dispatch(updateCalculationAction);
            console.log(`Updated: ${year}`);
        }
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)((SettingMenuComponent) as any)