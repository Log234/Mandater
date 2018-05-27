import { LayoutComponent } from "../components/LayoutComponent";
import { connect } from "react-redux";
import { ApplicationState } from "../store";
import { initializeComputation } from "../actions/ComputationActions";
import { initializeTable } from "../actions/TableActions";
import { initializeRequestedData } from "../actions/RequestedDataActions";
import { initializeSettings } from "../actions/SettingActions";
import { ElectionType } from "../interfaces/ElectionType";
import { request } from "../logic/ApiRequests";

const mapStateToProps = (state: ApplicationState) => {
    return {};
}

const mapDispatchToProps = (dispatch: any) => ({
    initializeState: async () => {
        const uri = "https://mandater-testing.azurewebsites.net/api/v1.0.0/no/pe?deep=true";
        const failover: ElectionType = {
            internationalName: "UNDEFINED",
            electionTypeId: -1,
            countryId: -1,
            elections: []
        }
        
        const electionType = await request<ElectionType>(uri, failover);
        const initializeRequestDataAction = initializeRequestedData(electionType);
        const initializeComputationAction = initializeComputation(electionType);
        const initializeSettingsAction = initializeSettings(electionType);
        const tableAction = initializeTable();
        dispatch(initializeRequestDataAction);
        dispatch(initializeComputationAction);
        dispatch(initializeSettingsAction);
        dispatch(tableAction);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)((LayoutComponent) as any)