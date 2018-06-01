import * as React from "react";
import { PresentationType } from "../types/PresentationType";
import { TableComponent } from "./TableComponent";
import { ComputationResults } from "../logic/ComputationResult";
import { filterZeroColumns, roundDecimals } from "../logic/TableFilters";
import { DecomposedTable } from "../interfaces/DecomposedTable";

export interface PresentationProps {
    results: ComputationResults,
    currentPresentation: PresentationType,
    decimals: number;
}

export class PresentationComponent extends React.Component<PresentationProps, {}> {
    render() {
        const results = this.props.results;
        const tableType = this.props.currentPresentation;
        return (<TableComponent table={results.getPresentationTable(tableType, undefined, [filterZeroColumns], roundDecimals.bind(this, this.props.decimals))}/>);
    }
}