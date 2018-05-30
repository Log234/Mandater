import { ComputationSets } from "./ComputationSets";
import { NumberToNumberFilter, NumberToStringFilter, StringToStringFilter } from "./ArrayFilters";
import { TableTypes } from "../types/TableTypes";
import { composeTable } from "../logic/TableFunctions";
import { DecomposedTable } from "./DecomposedTable";

export class ComputationResults {
    computationSets: ComputationSets;

    constructor(computationSets: ComputationSets) {
        this.computationSets = computationSets;
    }

    updateSets(newSets: ComputationSets): void {
        this.computationSets = newSets;
    }

    getTableTypes(): TableTypes[] {
        return this.computationSets.getTableTypes();
    }

    getPresentationTable(tableType: TableTypes,
        ntnFilters?: NumberToNumberFilter[],
        ntsFilter?: NumberToStringFilter,
        stsFilters?: StringToStringFilter[]): string[][] {

        const decomposedTable = this.computationSets.getTable(tableType);

        // Filter out rows or collumns depending on their numerical values
        let numberData = decomposedTable;
        if (ntnFilters !== undefined) {
            for (let curNtn of ntnFilters) {
                numberData = curNtn(numberData);
            }
        }

        // Apply relevant number to string filter (if defined) or convert the table from number to string
        let stringData: DecomposedTable<string>;
        if (ntsFilter !== undefined) {
            stringData = ntsFilter(numberData);
        } else {
            stringData = {
                header: numberData.header,
                rowId: numberData.rowId,
                body: []
            }

            for (let row of numberData.body) {
                const stringRow = row.map(String);
                stringData.body.push(stringRow);
            }
        }

        // Filter out rows or collumns depending on their string values
        if (stsFilters !== undefined) {
            for (let curSts of stsFilters) {
                stringData = curSts(stringData);
            }
        }

        // Attach collumn headers and row identifiers
        const finalTable = composeTable(stringData);

        return finalTable;
    }
}