import * as React from "react";
import { TableData } from "../interfaces/TableData";

type TableProps = {
    tableData: TableData;
}

export class TableComponent extends React.Component<TableProps, {}> {
    render() {
        const header: React.ReactNode[] = [];
        const rows: React.ReactNode[] = [];
        const headerData = this.props.tableData.tableHeaders;
        const rowData = this.props.tableData.tableRows;
        for (let data of headerData) {
            header.push(<th key={data}>{data}</th>);
        }
        for (let data of rowData) {
            const row: React.ReactNode[] = [];
            let index: number = 0;
            for (let column of data.rowData) {
                row.push(<td key={index += 1}>{column}</td>);
            }

            rows.push(<tr key={data.key}>{row}</tr>);
        }

        return (
            <div>
                <table className="partyTable">{/* TODO: Update this to ElectionOverview or some simple table class */}
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