import { DecomposedTable } from "../interfaces/DecomposedTable";
import { TableFilter } from "../interfaces/ArrayFilters";
import { filterTable } from "./TableFunctions";

/**
 * Iterates through the values of the table, rounding off any float values
 * to the specified number of decimals.
 *
 * @param decimals Number of decimals to round to
 * @param table Table with values to round
 */
export function roundDecimals(decimals: number, table: DecomposedTable<number>): DecomposedTable<string> {
    const roundedTable: DecomposedTable<string> = {
        header: [...table.header],
        rowId: [...table.rowId],
        body: []
    };

    if (table.body === undefined) {
        return roundedTable;
    }

    for (const row of table.body) {
        const roundedRow: string[] = [];
        for (const column of row) {
            if (column === undefined) {
                roundedRow.push("undefined");
            } else if (Number.isInteger(column)) {
                roundedRow.push(column.toString());
            } else {
                roundedRow.push(column.toFixed(decimals));
            }
        }
        roundedTable.body.push(roundedRow);
    }

    return roundedTable;
}

/**
 * Removes all columns that contains only zeroes
 *
 * @param table Table to be filtered
 */
export function filterZeroColumns(table: DecomposedTable<number>): DecomposedTable<number> {
    const filter: TableFilter = {
        columns: [],
        rows: []
    };

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

/**
 * Iterates through the table and removes any rows
 * where the specified column matches the specified value.
 *
 * @param columnIndex Index of the column to compare
 * @param value Value that will be removed
 * @param table Table to be filtered
 */
export function filterRowByValue(columnIndex: number, value: number, table: DecomposedTable<number>): DecomposedTable<number> {
    const filter: TableFilter = {
        columns: [],
        rows: []
    };

    for (let row = 0; row < table.body.length; row++) {
        if (table.body[row][columnIndex] === value) {
            filter.rows.push(row);
        }
    }

    return filterTable<number>(table, filter);
}