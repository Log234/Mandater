import * as React from "react";
import ReactTable, { Column } from "react-table";
import { DistrictResult } from "../interfaces/DistrictResult";

export interface SeatDistributionProps {
    districtResults: DistrictResult[];
}

export class SeatDistribution extends React.Component<
    SeatDistributionProps,
    {}
> {
    generateColumns(): Column[] {
        const columns: Column[] = [
            {
                Header: "Fylke",
                accessor: "name"
            }
        ];

        for (const districtResult of this.props.districtResults) {
            districtResult.partyResults.sort((v, t) => v.partyName.localeCompare(t.partyName));
        }

        if (this.props.districtResults.length > 0) {
            for (let partyIndex = 0; partyIndex < this.props.districtResults[0].partyResults.length; partyIndex++) {
                const element = this.props.districtResults[0].partyResults[partyIndex];
                columns.push({
                    Header: element.partyName,
                    accessor: `partyResults[${partyIndex}].totalSeats`
                });
            }
        }

        return columns;
    }

    render() {
        return (
            <ReactTable
                className="-highlight -striped"
                defaultPageSize={19}
                showPaginationBottom={false}
                data={this.props.districtResults}
                columns={this.generateColumns()}
            />
        );
    }
}
