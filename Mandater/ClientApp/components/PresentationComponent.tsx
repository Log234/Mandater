import * as React from "react";
import { VictoryChart, VictoryBar } from "victory";
import ReactTable, { Column } from "react-table";
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
import { getPartyTableData } from "../logic/PresentationUtilities";

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
            return this.props.newResults.partyResults.filter(
                party => party.totalSeats > 0
            );
        }
    }

    render() {
        const newResults = this.props.newResults;
        const showPartiesWithoutSeats = this.props.showPartiesWithoutSeats;
        const decimals = this.props.decimals;

        const results = this.props.results;
        const tableType = this.props.currentPresentation;

        const ntnFilters: NumberToNumberFilter[] = [];

        switch (tableType) {
            case PresentationType.ElectionTable:
                return (
                    <ReactTable
                        data={getPartyTableData(
                            newResults.partyResults,
                            showPartiesWithoutSeats,
                            decimals
                        )}
                        columns={[
                            {
                                Header: "Parti",
                                accessor: "partyCode"
                            },
                            {
                                Header: "Stemmer",
                                accessor: "votes"
                            },
                            {
                                Header: "Prosent",
                                accessor: "percentVotes"
                            },
                            {
                                Header: "Distrikt",
                                accessor: "districtSeats"
                            },
                            {
                                Header: "Utjevning",
                                accessor: "levelingSeats"
                            },
                            {
                                Header: "Sum",
                                accessor: "totalSeats"
                            }
                        ]}
                        defaultSorted={[
                            {
                                id: "totalSeats",
                                desc: true
                            }
                        ]}
                    />
                );
            case PresentationType.DistrictTable:
                return <ReactTable
                    data={this.props.newResults.districtResults}
                    columns={[{
                        Header: "Fylke",
                        accessor: "name"
                    }]}
                />;
            case PresentationType.SeatsPerParty:
                return (
                    <VictoryChart
                        animate={{ duration: 500 }}
                        domainPadding={{ x: 20 }}>
                        <VictoryBar
                            data={this.getData().sort((a, b) => {
                                return b.totalSeats - a.totalSeats;
                            })}
                            sortKey="t"
                            x="partyCode"
                            y="totalSeats"
                        />
                    </VictoryChart>
                );
            case PresentationType.FancyElectionTable:
                return (
                    <ReactTable
                        data={this.getData()}
                        columns={[
                            { Header: "Partyname", accessor: "partyName" },
                            { Header: "Seats", accessor: "totalSeats" }
                        ]}
                        defaultPageSize={Math.min(10, this.getData().length)}
                    />
                );
            default:
                console.log(`Could not find presentation type ${tableType}`);
                return <g />;
        }
    }
}
