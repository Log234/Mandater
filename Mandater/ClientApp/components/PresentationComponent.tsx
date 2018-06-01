import * as React from "react";
import { PresentationType } from "../types/PresentationType";
import { TableComponent } from "./TableComponent";
import { ComputationResults } from "../logic/ComputationResult";

export interface PresentationProps {
    results: ComputationResults,
    currentPresentation: PresentationType;
}

export class PresentationComponent extends React.Component<PresentationProps, {}> {
    render() {
        const results = this.props.results;
        const tableType = this.props.currentPresentation;
        return (<TableComponent table={results.getPresentationTable(tableType)}/>);
    }
}