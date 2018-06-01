import { DecomposedTable } from "./DecomposedTable";

export type NumberToNumberFilter = (array: DecomposedTable<number>) => DecomposedTable<number>

export type NumberToStringFilter = (array: DecomposedTable<number>) => DecomposedTable<string>

export type StringToStringFilter = (array: DecomposedTable<string>) => DecomposedTable<string>

export interface TableFilter {
    rows: number[],
    columns: number[],
}