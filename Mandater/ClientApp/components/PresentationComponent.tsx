import * as React from "react";
import { TableComponent } from "./TableComponent";
import { ITableData } from "../interfaces/TableData";
import { PartyResultDictionary } from "../interfaces/PartyResultDictionary";
import { TableMode } from "../interfaces/states/TableState";

type PresentationProps = {
    results: PartyResultDictionary,
    tableMode: TableMode;
}

export class PresentationComponent extends React.Component<PresentationProps, {}> {
    render() {
        const results = this.props.results;
        let tableData: ITableData = {
            tableHeaders: [],
            tableRows: []
        }
        if (this.props.tableMode === TableMode.ElectionOverview) {
            tableData = {
                tableHeaders: ["Parti", "Stemmer", "%", "Distrikt", "Utjevning", "Sum"/*, "Differanse", "Prop."*/],
                tableRows: []
            }
            for (let result in results) {
                if (results.hasOwnProperty(result)) {
                    const value = results[result];
                    tableData.tableRows.push({
                        key: value.partyCode,
                        rowData: [
                            value.partyCode, value.totalVotes.toString(), value.percent.toString(), value.districtSeats.toString(),
                            value.levelingSeats.toString(), value.sum.toString()/*, "", ""*/
                        ]
                    });
                }
            }
        }
        else if (this.props.tableMode === TableMode.DistrictOverview) {
            window.alert("This overview has yet to be created!");
        }
        return (<TableComponent tableData={tableData}/>);
    }
}