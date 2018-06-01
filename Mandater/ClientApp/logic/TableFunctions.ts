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

    // Iterate through the header of decomposedTable and adds the filtered columns to alteredTable
    for (let column = 0; column < decomposedTable.header.length; column++) {
        if (filter.columns.indexOf(column) === -1) {
            alteredTable.header.push(decomposedTable.header[column]);
        }
    }
    
    // Iterates through decomposed table's rowIds and body
    // If the index is not in the filter, add the values in the altered table
    // As rows are removes, the index between the new and the old body shifts, this is counteracted by the offset
    let offset = 0;
    for (let row = 0; row < decomposedTable.rowId.length; row++) {
        if (filter.rows.indexOf(row) === -1) {
            alteredTable.rowId.push(decomposedTable.rowId[row]);
            alteredTable.body.push([]);
            for (let column = 0; column < decomposedTable.body[0].length; column++) {
                if (filter.columns.indexOf(column) === -1) {
                    alteredTable.body[row-offset].push(decomposedTable.body[row][column]);
                }
            }
        } else {
            offset++;
        }
        
    }

    return alteredTable;
}