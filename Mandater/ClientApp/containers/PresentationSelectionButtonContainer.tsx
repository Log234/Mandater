import { ApplicationState } from "../store";
import { PresentationSelectionButton, PresentationSelectionButtonProps } from "../components/PresentationSelectionButton";
import { connect } from "react-redux";
import { changePresentation } from "../actions/PresentationActions";

const mapStateToProps = (state : ApplicationState) => {
    return {}
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    onPress: () => {
        const action = changePresentation(ownProps.presentationSelected);
        dispatch(action);
        console.log(`Action ${action.type} dispatched`);
    }
} as PresentationSelectionButtonProps);

export default connect(mapStateToProps, mapDispatchToProps)((PresentationSelectionButton) as any)   