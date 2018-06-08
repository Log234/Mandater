import * as React from "react";
import ReactTable from "react-table";
import { getPartyTableData } from "../logic/PresentationUtilities";
import { LagueDhontResult } from "../interfaces/LagueDhontResult";

export interface ElectionOverviewProps {
    decimals: number;
    showPartiesWithoutSeats: boolean;
    results: LagueDhontResult;
}

export class ElectionOverview extends React.Component<ElectionOverviewProps, {}> {
    render() {
        const results = this.props.results;
        const showPartiesWithoutSeats = this.props.showPartiesWithoutSeats;
        const decimals = this.props.decimals;

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
    }
}
