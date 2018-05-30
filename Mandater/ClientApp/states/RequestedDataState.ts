import { ElectionType } from "../interfaces/ElectionType";

export interface RequestedDataState {
    electionType: ElectionType
}

export const unloadedState: RequestedDataState = {
    electionType: {
        countryId: -1,
        electionTypeId: -1,
        internationalName: "UNDEFINED",
        elections: []
    }
};