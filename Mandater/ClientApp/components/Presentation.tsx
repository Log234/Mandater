import * as React from 'react';
import { ResultsTable } from './ResultsTable';

type State = {
    showGraph: string
}

export class Presentation extends React.Component<{}, State> {
    state: State = {
        showGraph: 'PartyTable'
    }

    // returns the corresponding View based on currentMode
    getView() {
        switch (this.state.showGraph) {
            case 'ResultsTable':
                return <ResultsTable />
            default:
                return <ResultsTable />
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