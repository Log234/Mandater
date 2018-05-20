import { ApplicationState } from "../store";
import { TableButton } from "../components/TableButton";
import { connect } from "react-redux";
import { changeTable } from "../actions/TableActions";

const mapStateToProps = (state: ApplicationState) => {
    return {}
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
    onPress: () => {
        const changeTableAction = changeTable(ownProps.tableMode);
        dispatch(changeTableAction);
        console.log(`Action ${changeTableAction.type} dispatched`);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)((TableButton) as any)