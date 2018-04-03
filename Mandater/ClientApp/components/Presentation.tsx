import * as React from 'react';
import { CountyTable } from './CountyTable';
import { PartyTable } from './PartyTable';

type PresentationState = {
    showGraph: string,
    year: number
}

export class Presentation extends React.Component<{}, PresentationState> {
    state: PresentationState = {
        showGraph: 'PartyTable',
        year: 2017
    }

    // returns the corresponding View based on currentMode
    getView() {
        switch (this.state.showGraph) {
            case 'CountyTable':
                return <CountyTable />
            case 'PartyTable':
                return <PartyTable />
            default:
                return <PartyTable />
        }
    }

    render() {
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
                        <tr>
                            <th>Rødt</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>MDG</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th>SV</th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}