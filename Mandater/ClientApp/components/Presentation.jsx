import * as React from 'react';
import { ResultsTable } from './ResultsTable';

export class Presentation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMode: 'ResultsTable'
        };
    }

    // returns the corresponding View based on currentMode
    getView(currentMode) {
        switch (currentMode) {
            case 'ResultsTable':
                return <ResultsTable />
            default:
                null
        }
    }

    // update currentMode when ConfigurationMenu triggers the callback
    toggleView(currentMode) {
        this.setState({ currentMode });
    }

    render() {
        return (
            <div>
                {this.getView(this.state.currentMode)}
            </div>
        );
    }
}