import { ApplicationState } from "../store";
import { connect } from "react-redux";
import { SettingMenuComponent } from "../components/SettingMenuComponent";
import { Election } from "../interfaces/Election";
import { updateElectionData } from "../store/ElectionReducer";
import * as Index from "react/index";
import { ElectionType } from "../interfaces/ElectionType";

const mapStateToProps = (state: ApplicationState) => ({
    selectOptions: state.electionState.electionYears,
    firstDivisor: state.electionState.firstDivisor,
    threshold: state.electionState.electionThreshold,
    districtSeats: state.electionState.districSeats,
    levellingSeats: state.electionState.levellingSeats,
    electionType: state.electionState.electionType
});

const mapDispatchToProps = (dispatch: any) => ({
    updateCalculation: (year: string, electionType: ElectionType, firstDivisor: number, electionThreshold: number, districtSeats: number, levellingSeats: number) => {
        let value = parseInt(year);
        console.log(`Selected: ${value}`);
        let election = electionType.elections.find(element => element.year === value);
        if (election !== undefined) {
            let updateCalculationAction = updateElectionData(election, firstDivisor, electionThreshold, districtSeats, levellingSeats);
            dispatch(updateCalculationAction);
            console.log(`Updated: ${year}`);
        }
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)((SettingMenuComponent) as any)