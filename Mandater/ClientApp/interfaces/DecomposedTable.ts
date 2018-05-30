export interface DecomposedTable<T> {
    header: string[],
    rowId: string[],
    body: T[][];
}