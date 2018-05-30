import { TableTypes } from "../types/TableTypes";
import { DecomposedTable } from "./DecomposedTable";

export interface ComputationSets {
    getTableTypes: () => TableTypes[],
    getTable: (tableType: TableTypes) => DecomposedTable<number>;
}