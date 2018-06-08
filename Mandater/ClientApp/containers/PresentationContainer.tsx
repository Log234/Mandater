import { ApplicationState } from "../store";
import { PresentationComponent, PresentationProps } from "../components/PresentationComponent";
import { connect } from "react-redux";

const mapStateToProps = (state: ApplicationState) => {
    console.log("PresentationContainer mapped state to props");
    return {
        newResults: state.computationState.newResults,
        results: state.computationState.partyResults,
        currentPresentation: state.presentationState.currentPresentation,
        decimals: state.presentationState.decimalsNumber,
        showPartiesWithoutSeats: state.presentationState.showPartiesWithoutSeats
    } as PresentationProps;
};

export default connect(
    mapStateToProps,
    {}
)((PresentationComponent) as any);