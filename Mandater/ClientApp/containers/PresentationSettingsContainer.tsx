import { ApplicationState } from "../store";
import { connect } from "react-redux";
import { PresentationSettings, PresentationSettingsProps } from "../components/PresentationSettings";

function mapStateToProps(state : ApplicationState) {
    return {
        results : state.computationState.partyResults
    } as PresentationSettingsProps;
}

const presentationSettingsContainer = connect(mapStateToProps, {})((PresentationSettings) as any);

export default presentationSettingsContainer;