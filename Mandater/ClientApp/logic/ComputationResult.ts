import { ComputationSets } from "../interfaces/ComputationSets";
import { NumberToNumberFilter, NumberToStringFilter, StringToStringFilter } from "../interfaces/ArrayFilters";
import { composeTable } from "../logic/TableFunctions";
import { DecomposedTable } from "../interfaces/DecomposedTable";
import { PresentationType } from "../types/PresentationType";

export class ComputationResults {
    computationSets: ComputationSets;

    constructor(computationSets: ComputationSets) {
        this.computationSets = computationSets;
    }

    updateSets(newSets: ComputationSets): void {
        this.computationSets = newSets;
    }

    getPresentationTypes(): PresentationType[] {
        return this.computationSets.getPresentationTypes();
    }

    getPresentationTable(tableType: PresentationType,
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

        // Attach column headers and row identifiers
        const finalTable = composeTable(stringData);

        return finalTable;
    }
}