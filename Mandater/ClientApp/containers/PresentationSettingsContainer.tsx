import { ApplicationState } from "../store";
import { connect } from "react-redux";
import { PresentationSettings, PresentationSettingsProps } from "../components/PresentationSettings";

function mapStateToProps(state : ApplicationState) {
    return {
        results : state.ComputationState.partyResults
    } as PresentationSettingsProps
}

const PresentationSettingsContainer = connect(mapStateToProps, {})(PresentationSettings);

export default PresentationSettingsContainer;