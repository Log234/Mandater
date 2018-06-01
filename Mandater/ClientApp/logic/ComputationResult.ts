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

    // Returns a list of all partyCodes of this dataset
    // Note: The order of the partyCodes and partyNames match, so the index can be used to find matching names and codes
    getPartyCodes(): string[] {
        return [...this.computationSets.partyCodes];
    }

    // Returns a list of all partyNames of this dataset
    // Note: The order of the partyCodes and partyNames match, so the index can be used to find matching names and codes
    getPartyNames(): string[] {
        return [...this.computationSets.partyNames];
    }

    // Returns a list of all districts of this dataset
    getDistricts(): string[] {
        return [...this.computationSets.districts];
    }

    // Returns a list of all available presentation types for this dataset
    getPresentationTypes(): PresentationType[] {
        return [...this.computationSets.getPresentationTypes()];
    }

    // Returns a table matching the type requested in tableType
    // For tables related to a particular district, the district name must be specified
    // The filters are optional
    getPresentationTable(tableType: PresentationType,
        district?: string,
        ntnFilters?: NumberToNumberFilter[],
        ntsFilter?: NumberToStringFilter,
        stsFilters?: StringToStringFilter[]): string[][] {

        const decomposedTable = this.computationSets.getTable(tableType, district);

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