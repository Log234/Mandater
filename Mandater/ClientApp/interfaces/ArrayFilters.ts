import { DecomposedTable } from "./DecomposedTable";

export interface NumberToNumberFilter {
    (array: DecomposedTable<number>): DecomposedTable<number>
}

export interface NumberToStringFilter {
    (array: DecomposedTable<number>): DecomposedTable<string>
}

export interface StringToStringFilter {
    (array: DecomposedTable<string>): DecomposedTable<string>
}

export interface TableFilter {
    rows: number[],
    columns: number[],
}