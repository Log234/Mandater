import * as React from "react";

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
                   <button onClick={ (event: any) => this.toggleResultsTable("PartyTable") }>Partitabell</button>
                   <button onClick={ (event: any) => this.toggleResultsTable("CountyTable") }>Fylkestabell</button>
               </div>;

    }
}