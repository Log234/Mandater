import * as React from "react";
import { PresentationType } from "../types/PresentationType";
import { TableComponent } from "./TableComponent";
import { ComputationResults } from "../logic/ComputationResult";
import { filterZeroColumns, roundDecimals, filterRowByValue } from "../logic/TableFilters";
import { DecomposedTable } from "../interfaces/DecomposedTable";
import { NumberToNumberFilter } from "../interfaces/ArrayFilters";

export interface PresentationProps {
    results: ComputationResults;
    currentPresentation: PresentationType;
    decimals: number;
    showPartiesWithoutSeats: boolean;
}

export class PresentationComponent extends React.Component<PresentationProps, {}> {
    render() {
        const results = this.props.results;
        const tableType = this.props.currentPresentation;

        const ntnFilters: NumberToNumberFilter[] = [];

        switch (tableType) {
            default:
            case PresentationType.ElectionTable:
                if (!this.props.showPartiesWithoutSeats) {
                    ntnFilters.push(filterRowByValue.bind(this, 4, 0));
                }

                return (<TableComponent table={results.getPresentationTable(tableType, undefined, ntnFilters, roundDecimals.bind(this, this.props.decimals))}/>);
            case PresentationType.DistrictTable:
            if (!this.props.showPartiesWithoutSeats) {
                ntnFilters.push(filterZeroColumns);
            }
                return (<TableComponent table={results.getPresentationTable(tableType, undefined, ntnFilters)}/>);
        }
    }
}