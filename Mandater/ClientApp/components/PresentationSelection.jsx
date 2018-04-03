import * as React from 'react';
import { createStore } from 'redux'
import * as index from '../store'
import { Presentation } from './Presentation';

//const store = createStore(index.reducers.userInterface)

export class PresentationSelection extends React.Component {
    constructor(props) {
        super(props);
        this.toggleResultsTable = this.toggleResultsTable.bind(this);
    }

    toggleResultsTable(view) {
        const action = {
            type: 'CHANGE_GRAPH',
            showGraph: view
        }
        console.log(view);
        //store.dispatch(action);
    }

    render() {
        return <div className="presentation-selection">
            <h2>Presentasjonstyper</h2>
            <button onClick={ this.toggleResultsTable('PartyTable') }>Partitabell</button>
            <button onClick={ this.toggleResultsTable('CountyTable') }>Fylkestabell</button>
        </div>

    }
}