import * as React from "react";
import { PartyResult } from "ClientApp/interfaces/PartyResult";

type PresentationState = {
    showGraph: string,
    year: number;
}

type PresentationProps = {
    results: { [id: string]: PartyResult },
    showGraph: string;
}

export class PresentationComponent extends React.Component<PresentationProps, {}> {
    // returns the corresponding View based on currentMode
    getView() {
        console.log("getView called from PresentationComponent");
    }

    render() {
        let rows = [];
        let results = this.props.results;
        for (let result in results) {
            if (results.hasOwnProperty(result)) {
                let value = results[result];

                rows.push((<tr key={value.partyCode}>
                               <td>{value.partyCode}</td>
                               <td>{value.totalVotes.toString()}</td>
                               <td>{value.percent.toString()}</td>
                               <td>{value.sum.toString()}</td>
                               <td></td>
                               <td></td>
                               <td></td>
                               <td></td>
                           </tr>) as any);
            }
        }

        return (
            <div>
                {this.getView()}
                <table className="partyTable">
                    <thead>
                    <tr>
                        <th>Parti</th>
                        <th>Stemmer</th>
                        <th>Prosent</th>
                        <th>Distrikt</th>
                        <th>Utjevning</th>
                        <th>Sum</th>
                        <th>Differanse</th>
                        <th>Prop.</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}