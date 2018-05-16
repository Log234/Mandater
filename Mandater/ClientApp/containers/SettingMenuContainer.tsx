﻿import { ApplicationState } from "../store";
import { connect } from "react-redux";
import { SettingMenuComponent } from "../components/SettingMenuComponent";
import { Election } from "../interfaces/Election";
import { updateElectionData } from "../store/ElectionReducer";
import * as Index from "react/index";
import { ElectionType } from "../interfaces/ElectionType";

const mapStateToProps = (state: ApplicationState) => ({
    selectOptions: state.electionState.electionYears,
    firstDivisor: state.electionState.firstDivisor,
    electionType: state.electionState.electionType
});

const mapDispatchToProps = (dispatch: any) => ({
    updateCalculation: (year: string, electionType: ElectionType) => {
        let value = parseInt(year);
        console.log(`Selected: ${value}`);
        let election = electionType.elections.find(element => element.year === value);
        if (election !== undefined) {
            let updateCalculationAction = updateElectionData(election);
            dispatch(updateCalculationAction);
            console.log(`Updated: ${year}`);
        }
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)((SettingMenuComponent) as any)