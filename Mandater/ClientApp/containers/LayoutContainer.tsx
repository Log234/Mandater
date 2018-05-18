import { LayoutComponent } from "../components/LayoutComponent";
import { connect } from "react-redux";
import { ApplicationState } from "../store";
import { initializeParliamentaryElectionData } from "../store/ElectionReducer";

const mapStateToProps = (state: ApplicationState) => {
    return {};
}

const mapDispatchToProps = (dispatch: any) => ({
    initializeState: async () => {
        let action = await initializeParliamentaryElectionData();
        dispatch(action);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)((LayoutComponent) as any)