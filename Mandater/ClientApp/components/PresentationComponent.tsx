import * as React from 'react';
import { CountyTable } from './CountyTable';
import { PartyTable } from './PartyTable';
import { PartyResultDictionary } from 'ClientApp/interfaces/PartyResultDictionary';
import { ApplicationState } from 'ClientApp/store';
import { connect } from 'react-redux';
import { PartyResult } from 'ClientApp/interfaces/PartyResult';

type PresentationState = {
    showGraph: string,
    year: number
}

type PresentationProps = {
    results: { [id: string]: PartyResult },
    showGraph: string
}

export class PresentationComponent extends React.Component<PresentationProps, {}> {
    // returns the corresponding View based on currentMode
    getView() {
        switch (this.props.showGraph) {
            case 'CountyTable':
                return <CountyTable />
            case 'PartyTable':
                return <PartyTable />
            default:
                return <PartyTable />
        }
    }

    render() {
        let rows = [];
        for (let result in this.props.results) {
            let value = this.props.results[result];

            rows.push(<tr>
                <td>{value.partyCode}</td>
                <td>{value.totalVotes.toString()}</td>
                <td></td>
                <td>{value.sum.toString()}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>)
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