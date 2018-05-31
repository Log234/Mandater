import { DecomposedTable } from "./DecomposedTable";
import { PresentationType } from "../types/PresentationType";

export interface ComputationSets {
    getPresentationTypes: () => PresentationType[],
    getTable: (tableType: PresentationType) => DecomposedTable<number>;
}