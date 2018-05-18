import { ApplicationState } from "../store";
import { connect } from "react-redux";
import { SettingMenuComponent } from "../components/SettingMenuComponent";
import { Election } from "../interfaces/Election";
import { updateElectionData } from "../store/ElectionReducer";
import * as Index from "react/index";
import { ElectionType } from "../interfaces/ElectionType";

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
    updateCalculation: (year: number, electionType: ElectionType, firstDivisor: number, electionThreshold: number, districtSeats: number, levelingSeats: number) => {
        console.log(`Selected: ${year}`);
        let election = electionType.elections.find(element => element.year === year);
        if (election !== undefined) {
            let updateCalculationAction = updateElectionData(election, year, firstDivisor, electionThreshold, districtSeats, levelingSeats);
            dispatch(updateCalculationAction);
            console.log(`Updated: ${year}`);
        }
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)((SettingMenuComponent) as any)