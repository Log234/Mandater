import * as React from "react";

type TableProps = {
    table: string[][];
}

export class TableComponent extends React.Component<TableProps, {}> {
    render() {
        const header: React.ReactNode[] = [];
        const rows: React.ReactNode[] = [];

        // Create header
        for (const data of this.props.table[0]) {
            header.push(<th key={data}>{data}</th>);
        }

        // Create rows
        for (const tableRow of this.props.table.slice(1)) {
            const row: React.ReactNode[] = [];

            let index: number = 0;
            for (const column of tableRow) {
                row.push(<td key={index += 1}>{column}</td>);
            }

            rows.push(<tr key={tableRow[0]}>{row}</tr>);
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