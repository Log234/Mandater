import { DecomposedTable } from "./DecomposedTable";
import { PresentationType } from "../types/PresentationType";

export interface ComputationSets {
    partyCodes: string[], // partyCodes and partyNames are in the same order
    partyNames: string[],
    districts: string[],
    getPresentationTypes: () => PresentationType[],
    getTable: (tableType: PresentationType, district?: string) => DecomposedTable<number>;
}