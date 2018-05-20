import * as React from "react";
import { TableComponent } from "./TableComponent";
import { ITableData, ITableRow } from "../interfaces/TableData";
import { PartyResultDictionary } from "../interfaces/PartyResultDictionary";
import { TableMode } from "../interfaces/states/TableState";
import { Dictionary } from "../interfaces/Dictionary"
import { PartyResult } from "../interfaces/PartyResult";
import { ProcessedResult } from "../interfaces/ProcessedResult";

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
        };
        if (this.props.tableMode === TableMode.ElectionOverview) {
            tableData = {
                tableHeaders: ["Parti", "Stemmer", "%", "Distrikt", "Utjevning", "Sum"/*, "Differanse", "Prop."*/],
                tableRows: []
            };
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
            tableData = {
                tableHeaders:
                    [""], // These have to be parties that have received seats in the calculation, first header is blank
                tableRows: [], // [countyName]
            };

            const array: PartyResult[] = [];
            for (let key in results) {
                if (results.hasOwnProperty((key))) {
                    const value = results[key];
                    array.push(value);
                }
            }
            const countyNames : string[] = [];
            const countyResults: Dictionary<ProcessedResult[]> = {}
            // Filters out ones with mandates
            const filteredArray = array.filter(result => result.sum >= 1);
            // Generates tableHeaders
            filteredArray.forEach((party) => tableData.tableHeaders.push(party.partyCode));
            // Generates a string array of county names
            filteredArray[0].resultsPerCounty.forEach((result) => {
                countyNames.push(result.countyName);
            });
            // Retrieves countyResults from results object, indexed by party
            filteredArray.forEach(
                (party) => {
                    countyResults[party.partyCode] = party.resultsPerCounty;
                }
            );
            // Iterate through all counties and set up the first value in each row
            countyNames.forEach((name) => {
                tableData.tableRows.push({ key: name, rowData: [name] });
            });
            // Use key to populate row with actual data
            tableData.tableRows.forEach((element) => {
                filteredArray.forEach((party) => {
                    const found = party.resultsPerCounty.find(result => result.countyName === element.key);
                    if (found != null) {
                        element.rowData.push(found.seats.toString());
                    }
                });
            });
//            console.log(countyResults);
//            tableData.tableHeaders.forEach((header) => console.log(header)); // Debug
//            tableData.tableRows.forEach((row) => {
//                console.log(row);
//            }); // Debug
        }
        return (<TableComponent tableData={tableData}/>);
    }
}