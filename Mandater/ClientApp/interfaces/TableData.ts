export interface ITableData {
    tableHeaders: string[],
    tableRows: ITableRow[];
}

export interface ITableRow {
    key: string,
    rowData: string[];
}