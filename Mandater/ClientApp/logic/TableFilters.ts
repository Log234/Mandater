import { DecomposedTable } from "../interfaces/DecomposedTable";
import { TableFilter } from "../interfaces/ArrayFilters";
import { filterTable } from "./TableFunctions";

export function roundDecimals(decimals: number, table:DecomposedTable<number>): DecomposedTable<string> {
    const roundedTable: DecomposedTable<string> = {
        header: table.header,
        rowId: table.rowId,
        body: []
    }

    for (const row of table.body) {
        const roundedRow: string[] = [];
        for (const column of row) {
            if (Number.isInteger(column)) {
                roundedRow.push(column.toString())
            } else {
                roundedRow.push(column.toFixed(decimals))
            }
        }
        roundedTable.body.push(roundedRow);
    }

    return roundedTable;
}

export function filterZeroColumns(table: DecomposedTable<number>): DecomposedTable<number> {
    const filter: TableFilter = {
        columns: [],
        rows: []
    }

    if (table.body.length < 1) {
        return table;
    }

    for (let column = 0; column < table.body[0].length; column++) {
        let sum = 0;
        for (let row = 0; row < table.body.length; row++) {
            sum += table.body[row][column];
        }
        if (sum === 0) {
            filter.columns.push(column);
        }
    }

    return filterTable<number>(table, filter);
}