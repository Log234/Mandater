export interface TableData {
    tableHeaders: string[],
    tableRows: TableRow[];
}

export interface TableRow {
    key: string,
    rowData: string[];
}