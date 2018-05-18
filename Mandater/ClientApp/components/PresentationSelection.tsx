import * as React from "react";
import Button from "./Button";

type PresentationSelectionProps = {
    // TODO: Specify what props PresentationSelection needs
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
            
        </div>;

    }
}