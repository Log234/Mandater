﻿import { LayoutComponent } from "../components/LayoutComponent";
import { connect } from "react-redux";
import { initializeComputation } from "../actions/ComputationActions";
import { initializePresentation } from "../actions/PresentationActions";
import { initializeRequestedData } from "../actions/RequestedDataActions";
import { initializeSettings } from "../actions/SettingActions";
import { ElectionType } from "../interfaces/ElectionType";
import { request } from "../logic/ApiRequests";

const mapDispatchToProps = (dispatch: any) => ({
    initializeState: async () => {
        const uri =
            "https://mandater-testing.azurewebsites.net/api/v1.0.0/no/pe?deep=true";
        const failover: ElectionType = {
            internationalName: "UNDEFINED",
            electionTypeId: -1,
            countryId: -1,
            elections: []
        };
        const serializedState = localStorage.getItem("state");
        if (serializedState === null) {
            const electionType = await request<ElectionType>(uri, failover);
            const initializeRequestDataAction = initializeRequestedData(
                electionType
            );
            const initializeComputationAction = initializeComputation(
                electionType
            );
            const initializeSettingsAction = initializeSettings(electionType);
            const initializePresentationAction = initializePresentation();
            dispatch(initializeRequestDataAction);
            console.log(
                `Action of type ${initializeRequestDataAction.type} dispatched`
            );
            dispatch(initializeComputationAction);
            console.log(
                `Action of type ${initializeComputationAction.type} dispatched`
            );
            dispatch(initializePresentationAction);
            console.log(
                `Action of type ${initializePresentationAction.type} dispatched`
            );
            dispatch(initializeSettingsAction);
            console.log(
                `Action of type ${initializeSettingsAction.type} dispatched`
            );
        }
    }
});

export default connect(
    null,
    mapDispatchToProps
)(LayoutComponent as any);
