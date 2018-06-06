import * as React from "react";
import { VictoryChart, VictoryBar } from "victory";
import ReactTable from "react-table";
import { PresentationType } from "../types/PresentationType";
import { TableComponent } from "./TableComponent";
import { ComputationResults } from "../logic/ComputationResult";
import {
    filterZeroColumns,
    roundDecimals,
    filterRowByValue
} from "../logic/TableFilters";
import { DecomposedTable } from "../interfaces/DecomposedTable";
import { NumberToNumberFilter } from "../interfaces/ArrayFilters";
import { LagueDhontResult } from "../interfaces/LagueDhontResult";

export interface PresentationProps {
    results: ComputationResults;
    currentPresentation: PresentationType;
    decimals: number;
    showPartiesWithoutSeats: boolean;
    newResults: LagueDhontResult;
}

export class PresentationComponent extends React.Component<
    PresentationProps,
    {}
> {
    /**
     * Takes raw data from property/properties, and converts them to more
     * presentable things.
     */
    getData() {
        if (this.props.showPartiesWithoutSeats) {
            return this.props.newResults.partyResults;
        } else {
            return this.props.newResults.partyResults.filter(party => party.totalSeats > 0);
        }
    }

    render() {
        const results = this.props.results;
        const tableType = this.props.currentPresentation;

        const ntnFilters: NumberToNumberFilter[] = [];

        switch (tableType) {
            case PresentationType.ElectionTable:
                if (!this.props.showPartiesWithoutSeats) {
                    ntnFilters.push(filterRowByValue.bind(this, 4, 0));
                }
                return (
                    <TableComponent
                        table={results.getPresentationTable(
                            tableType,
                            undefined,
                            ntnFilters,
                            roundDecimals.bind(this, this.props.decimals)
                        )}
                    />
                );
            case PresentationType.DistrictTable:
                if (!this.props.showPartiesWithoutSeats) {
                    ntnFilters.push(filterZeroColumns);
                }
                return (
                    <TableComponent
                        table={results.getPresentationTable(
                            tableType,
                            undefined,
                            ntnFilters
                        )}
                    />
                );
            case PresentationType.SeatsPerParty:
                return (
                    <VictoryChart
                    animate={{duration: 500}}
                    domainPadding={{x: 20}}>
                        <VictoryBar
                        data={this.getData().sort((a, b) => {return b.totalSeats - a.totalSeats; })}
                        sortKey="t"
                        x="partyCode"
                        y="totalSeats"
                        />
                    </VictoryChart>
                );
            case PresentationType.FancyElectionTable:
                return <ReactTable data={this.getData()} columns={[{Header: "Partyname", accessor: "partyName"}, {Header: "Seats", accessor: "totalSeats"}]}
                defaultPageSize={Math.min(10, this.getData().length)}
                />;
            default:
                console.log(`Could not find presentation type ${tableType}`);
                return <g></g>;
        }
    }
}
