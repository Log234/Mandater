import * as React from "react";
import { PartyResult } from "ClientApp/interfaces/PartyResult";
import { TableComponent } from "./TableComponent";
import { ITableData, ITableRow } from "../interfaces/TableData";

type PresentationState = {
    showGraph: string,
    year: number;
}

type PresentationProps = {
    results: { [id: string]: PartyResult },
    showGraph: string;
}

export class PresentationComponent extends React.Component<PresentationProps, {}> {
    render() {
        let tableData: ITableData = {
            tableHeaders: ["Parti", "Stemmer", "Prosent", "Distrikt", "Utjevning", "Sum", "Differanse", "Prop."],
            tableRows: []
        }

        let results = this.props.results;
        for (let result in results) {
            if (results.hasOwnProperty(result)) {
                let value = results[result];
                tableData.tableRows.push({
                    key: value.partyCode,
                    rowData: [
                        value.partyCode, value.totalVotes.toString(), value.percent.toString(), value.sum.toString(),
                        "", "", "", ""
                    ]
                });
            }
        }

        return (<TableComponent tableData={tableData}/>);
    }
}