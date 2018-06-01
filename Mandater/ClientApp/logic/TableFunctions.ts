import { TableFilter } from "../interfaces/ArrayFilters";
import { DecomposedTable } from "../interfaces/DecomposedTable";

export function composeTable(decomposedTable: DecomposedTable<string>): string[][] {
    if (decomposedTable.rowId.length !== decomposedTable.body.length) {
        return [[]];
    }

    const fullBody = decomposedTable.rowId.map((id, i) => {
        return [id, ...decomposedTable.body[i]];
    });

    const fullTable = [decomposedTable.header, ...fullBody];

    return fullTable;
}

export function filterTable<T>(decomposedTable: DecomposedTable<T>, filter: TableFilter): DecomposedTable<T> {
    const alteredTable: DecomposedTable<T> = {
        header: [],
        rowId: [],
        body: []
    };

    // Iterate through the header of decomposedTable and adds the non-filtered columns to alteredTable
    for (let column = 0; column < decomposedTable.header.length; column++) {
        if (filter.columns.indexOf(column) === -1) {
            alteredTable.header.push(decomposedTable.header[column]);
        }
    }
    
    // Iterates through decomposed table's rowIds and body
    // If the index is not in the filter, add the values in the altered table
    for (let row = 0; row < decomposedTable.rowId.length; row++) {
        if (filter.rows.indexOf(row) === -1) {
            alteredTable.rowId.push(decomposedTable.rowId[row]);
            alteredTable.body[row] = [];
            for (let column = 0; column < decomposedTable.body[0].length; column++) {
                if (filter.columns.indexOf(column) === -1) {
                    alteredTable.body[row].push(decomposedTable.body[row][column]);
                }
            }
        }
        
    }

    return alteredTable;
}