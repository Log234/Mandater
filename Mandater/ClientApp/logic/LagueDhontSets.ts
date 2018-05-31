import { ComputationSets } from "../interfaces/ComputationSets";
import { DecomposedTable } from "../interfaces/DecomposedTable";
import { PresentationType } from "../types/PresentationType";

export class LagueDhontSets implements ComputationSets {
    getPresentationTypes(): PresentationType[] {
        return [
            PresentationType.DistrictTable,
            PresentationType.ElectionTable,
            PresentationType.SeatsPerParty
        ];
    }

    getTable(tableType: PresentationType): DecomposedTable<number> {
         throw new Error("Not implemented");
    }
}