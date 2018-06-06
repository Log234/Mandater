import { DecomposedTable } from "./DecomposedTable";
import { PresentationType } from "../types/PresentationType";

export interface ComputationSets {
    /**
     * A list of all the party codes in the current dataset
     * Maintains the same order as the list of party names
     */
    partyCodes: string[];

    /**
     * A list of all the party names in the current dataset
     * Maintains the same order as the list of party codes
     */
    partyNames: string[];

    /**
     * A list of all the districts in the current dataset
     */
    districts: string[];

    /**
     * Returns a list of all presentation types supported by the current dataset
     */
    getPresentationTypes: () => PresentationType[];

    /**
     * Returns a table of the type specified in string[][] format.
     *
     * @param tabletype The type of table to request, must be in the list returned by getPresentationTypes()
     * @param district [optional] If the type of table requested is related to a specific district, it should be specified here.
     */
    getTable: (tableType: PresentationType, district?: string) => DecomposedTable<number>;
}