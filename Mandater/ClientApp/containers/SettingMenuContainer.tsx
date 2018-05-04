import { ApplicationState } from "../store";
import { connect } from "react-redux";
import { SettingMenuComponent } from "../components/SettingMenuComponent";

const mapStateToProps = (state: ApplicationState) => ({
    selectOptions: state.electionState.electionYears
})

const mapDispatchToProps = (dispatch: any) => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingMenuComponent)