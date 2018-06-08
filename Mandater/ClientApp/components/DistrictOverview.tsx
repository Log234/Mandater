import * as React from "react";
import ReactTable from "react-table";
import { DistrictResult } from "../interfaces/DistrictResult";

export interface DistrictOverviewProps {
    districtResults: DistrictResult[];
    showPartiesWithoutSeats: boolean;
}

export class DistrictOverview extends React.Component<
    DistrictOverviewProps,
    {}
> {
    render() {
        return (
            <ReactTable
                data={this.props.districtResults}
                columns={[
                    {
                        Header: "Fylke",
                        accessor: "name"
                    }
                ]}
            />
        );
    }
}
