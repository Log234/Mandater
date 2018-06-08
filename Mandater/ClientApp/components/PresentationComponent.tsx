import * as React from "react";
import { VictoryChart, VictoryBar } from "victory";
import ReactTable, {  } from "react-table";
import { PresentationType } from "../types/PresentationType";
import { LagueDhontResult } from "../interfaces/LagueDhontResult";
import { getPartyTableData } from "../logic/PresentationUtilities";

export interface PresentationProps {
    currentPresentation: PresentationType;
    decimals: number;
    showPartiesWithoutSeats: boolean;
    results: LagueDhontResult;
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
            return this.props.results.partyResults;
        } else {
            return this.props.results.partyResults.filter(
                party => party.totalSeats > 0
            );
        }
    }

    render() {
        const results = this.props.results;
        const showPartiesWithoutSeats = this.props.showPartiesWithoutSeats;
        const decimals = this.props.decimals;

        const tableType = this.props.currentPresentation;


        switch (tableType) {
            case PresentationType.ElectionTable:
                return (
                    <ReactTable
                        className="-highlight -striped"
                        data={getPartyTableData(
                            results.partyResults,
                            showPartiesWithoutSeats,
                            decimals
                        )}
                        defaultPageSize={10}
                        showPaginationBottom={false}
                        showPaginationTop={true}
                        rowsText="rader"
                        pageText="Side"
                        ofText="av"
                        nextText="Neste"
                        previousText="Forrige"
                        columns={[
                            {
                                Header: "Parti",
                                accessor: "partyName"
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
                return (
                    <ReactTable
                    data={this.props.results.districtResults}
                        columns={[
                            {
                        Header: "Fylke",
                        accessor: "name"
                            }
                        ]}
                    />
                );
            case PresentationType.SeatsPerParty:
                return (
                    <VictoryChart animate={false}
                        domainPadding={{ x: 20 }}>
                        <VictoryBar
                            animate={{ duration: 200, onEntry: {
                                duration: 800
                            }, onLoad: {
                                duration: 800
                            },
                        onExit: {duration: 800} }}
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
