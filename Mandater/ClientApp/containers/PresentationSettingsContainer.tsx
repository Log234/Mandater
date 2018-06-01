import { ApplicationState } from "../store";
import { connect } from "react-redux";
import { PresentationSettings, PresentationSettingsProps } from "../components/PresentationSettings";
import { ChangeDecimalsAction } from "../actions/PresentationActions";
import { PresentationAction } from "../types/ActionTypes";

function mapStateToProps(state: ApplicationState) {
    return {
        decimals: state.presentationState.decimals,
        results: state.computationState.partyResults
    };
}

const mapDispatchToProps = (dispatch: any) =>
    ({
        changeDecimals: (decimals: string) => {
            dispatch({
                type: PresentationAction.ChangeDecimals,
                decimals
            } as ChangeDecimalsAction);
        }
    });

const presentationSettingsContainer = connect(mapStateToProps, mapDispatchToProps)((PresentationSettings) as any);

export default presentationSettingsContainer;