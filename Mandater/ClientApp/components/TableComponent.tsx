import * as React from "react";
import { ITableData as TableData } from "../interfaces/TableData";

type TableProps = {
    tableData: TableData
}

export class TableComponent extends React.Component<TableProps, {}> {
    render() {
        let header: React.ReactNode[] = [];
        let rows: React.ReactNode[] = [];
        let headerData = this.props.tableData.tableHeaders;
        let rowData = this.props.tableData.tableRows;
        for (let data of headerData) {
            header.push(<th key={data}>{data}</th>);
        }
        for (let data of rowData) {
            let row: React.ReactNode[] = [];
            let index: number = 0;
            for (let collumn of data.rowData) {
                row.push(<td key={index += 1}>{collumn}</td>);
            }

            rows.push(<tr key={data.key}>{row}</tr>);
        }

        return (
            <div>
                <table className = "partyTable">
                    <thead>
                        <tr key="header">
                            { header }
                        </tr>
                    </thead>
                    <tbody >
                        { rows }
                    </tbody>
                </table>
            </div>
            );
    }
}