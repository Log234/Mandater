import { ApplicationState } from "../store";
import { PresentationComponent } from "../components/PresentationComponent";
import { connect } from "react-redux";

const mapStateToProps = (state: ApplicationState) => ({
    results: state.electionState.partyResults,
    showGraph: "PartyTable"
});

const mapDispatchToProps = (dispatch: any) => ({

});

export default connect(
        mapStateToProps,
        mapDispatchToProps
    )((PresentationComponent) as any)