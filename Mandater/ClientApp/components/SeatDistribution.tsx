import * as React from "react";
import ReactTable, { Column } from "react-table";
import { DistrictResult } from "../interfaces/DistrictResult";
import * as _ from "lodash";

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
                accessor: "name",
                Footer: <span><strong>Sum</strong></span>
            }
        ];

        for (const districtResult of this.props.districtResults) {
            districtResult.partyResults.sort((v, t) => v.partyCode.localeCompare(t.partyCode));
        }

        if (this.props.districtResults.length > 0) {
            for (let partyIndex = 0; partyIndex < this.props.districtResults[0].partyResults.length; partyIndex++) {
                const element = this.props.districtResults[0].partyResults[partyIndex];
                columns.push({
                    Header: element.partyCode,
                    accessor: `partyResults[${partyIndex}].totalSeats`,
                    Footer: (
                        <span><strong>{_.sum(_.map(this.props.districtResults, d => d.partyResults[partyIndex].totalSeats))}</strong></span>
                    )
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
