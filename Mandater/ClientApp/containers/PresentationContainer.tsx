import { ApplicationState } from "../store";
import { PresentationComponent, PresentationProps } from "../components/PresentationComponent";
import { connect } from "react-redux";

const mapStateToProps = (state: ApplicationState) => {
    console.log("PresentationContainer mapped state to props");
    return {
        results: state.ComputationState.partyResults,
        currentPresentation: state.PresentationState.currentPresentation
    } as PresentationProps;
};

const mapDispatchToProps = (dispatch: any) => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)((PresentationComponent) as any)