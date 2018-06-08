import { ApplicationState } from "../store";
import { PresentationComponent, PresentationProps } from "../components/PresentationComponent";
import { connect } from "react-redux";

const mapStateToProps = (state: ApplicationState) => {
    console.log("PresentationContainer mapped state to props");
    return {
        results: state.computationState.results,
        currentPresentation: state.presentationState.currentPresentation,
        decimals: state.presentationState.decimalsNumber,
        showPartiesWithoutSeats: state.presentationState.showPartiesWithoutSeats
    } as PresentationProps;
};

export default connect(
    mapStateToProps,
    {}
)((PresentationComponent) as any);