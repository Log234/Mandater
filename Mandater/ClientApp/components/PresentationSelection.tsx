import * as React from "react";
import { TableMode } from "../interfaces/states/TableState";
import TableButtonContainer from "../containers/TableButtonContainer";

type PresentationSelectionProps = {
    tables: {[id: string] : TableMode}
}

export class PresentationSelection extends React.Component {
    constructor(props: PresentationSelectionProps) {
        super(props);
        this.toggleResultsTable = this.toggleResultsTable.bind(this);
    }

    toggleResultsTable(view: any) {
        const action = {
            type: "CHANGE_GRAPH",
            showGraph: view
        };
        console.log(view);
    }

    render() {
        return <div className="presentation-selection">
            <h2>Presentasjonstyper</h2>
            <TableButtonContainer title={"Distriktsoversikt"} tableMode={TableMode.DistrictOverview} />
            <TableButtonContainer title={"Landsoversikt"} tableMode={TableMode.ElectionOverview} />
        </div>;

    }
}