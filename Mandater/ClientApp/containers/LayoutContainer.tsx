import { LayoutComponent } from "../components/LayoutComponent";
import { connect } from "react-redux";
import { ApplicationState } from "../store";
import { initializeParliamentaryElectionData } from "../store/ElectionReducer";
import { initializePresentation } from "../actions";

const mapStateToProps = (state: ApplicationState) => {
    return {};
}

const mapDispatchToProps = (dispatch: any) => ({
    initializeState: async () => {
        const requestAndLoadAction = await initializeParliamentaryElectionData();
        const presentationAction = initializePresentation();
        dispatch(requestAndLoadAction);
        dispatch(presentationAction);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)((LayoutComponent) as any)