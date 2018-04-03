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
            </div>
        );
    }
}