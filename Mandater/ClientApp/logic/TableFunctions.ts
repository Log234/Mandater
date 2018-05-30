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
    const alteredTable = decomposedTable;

    for (let row of filter.rows) {
        alteredTable.body.splice(row);
        alteredTable.rowId.splice(row);
    }

    for (let i = 0; i < alteredTable.body.length; i++) {
        for (let column of filter.columns) {
            alteredTable.body[i].splice(column);
            alteredTable.header.splice(column);
        }
    }

    return alteredTable;
}