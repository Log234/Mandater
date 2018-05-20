import { LayoutComponent } from "../components/LayoutComponent";
import { connect } from "react-redux";
import { ApplicationState } from "../store";
import { initializeParliamentaryElectionData } from "../store/ElectionReducer";
import { initializeTable } from "../actions/TableActions";

const mapStateToProps = (state: ApplicationState) => {
    return {};
}

const mapDispatchToProps = (dispatch: any) => ({
    initializeState: async () => {
        const requestAndLoadAction = await initializeParliamentaryElectionData();
        const tableAction = initializeTable();
        dispatch(requestAndLoadAction);
        dispatch(tableAction);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)((LayoutComponent) as any)