import * as React from 'react';

export class Graph extends React.Component<{}, {}> {
    public render() {
        return (<div>
            <table className='electionTable'>
                <tr>
                    <th>Valgdistrikt</th>
                    <th>Rødt</th>
                    <th>MDG</th>
                    <th>SV</th>
                    <th>A</th>
                    <th>V</th>
                    <th>KrF</th>
                    <th>SP</th>
                    <th>H</th>
                    <th>FrP</th>
                    <th>Andre</th>
                    <th>Sum</th>
                </tr>
            </table>
        </div>);
    }
}