import { ApplicationState } from "../store";
import { PresentationSelectionButton, PresentationSelectionButtonProps } from "../components/PresentationSelectionButton";
import { connect } from "react-redux";
import { changePresentation } from "../actions/PresentationActions";

const mapStateToProps = (state : ApplicationState) => {
    return {};
};

const mapDispatchToProps = (dispatch: any, ownProps: PresentationSelectionButtonProps|undefined) => ({
    onPress: () => {
        const props = ownProps as PresentationSelectionButtonProps;
        const action = changePresentation(props.presentationSelected);
        dispatch(action);
        console.log(`Action ${action.type} dispatched`);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)((PresentationSelectionButton) as any)   