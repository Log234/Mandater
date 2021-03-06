import { ApplicationState } from "../store";
import { connect } from "react-redux";
import { PresentationSettings, PresentationSettingsProps } from "../components/PresentationSettings";
import { ChangeDecimalsAction } from "../actions/PresentationActions";
import { PresentationAction } from "../types/ActionTypes";

function mapStateToProps(state: ApplicationState) {
    return {
        currentPresentation: state.presentationState.currentPresentation,
        decimals: state.presentationState.decimals,
        results: state.computationState.results,
        showPartiesWithoutSeats: state.presentationState.showPartiesWithoutSeats
    };
}

const mapDispatchToProps = (dispatch: any) =>
    ({
        changeDecimals: (decimals: string, decimalsNumber: number) => {
            dispatch({
                type: PresentationAction.ChangeDecimals,
                decimals,
                decimalsNumber
            } as ChangeDecimalsAction);
        },
        toggleShowPartiesWithoutSeats: (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch({
                type: PresentationAction.ShowPartiesNoSeats,
                showPartiesWithoutSeats: event.target.checked
            });
        }
    });

const presentationSettingsContainer = connect(mapStateToProps, mapDispatchToProps)((PresentationSettings) as any);

export default presentationSettingsContainer;