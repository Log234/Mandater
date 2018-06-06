import { Election } from "../interfaces/Election";

export interface ElectionType {
    countryId: number;
    electionTypeId: number;
    elections: Election[];
    internationalName: string;
}