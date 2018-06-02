import { Result } from "../interfaces/Result";

export interface County {
    countyId: number;
    name: string;
    seats: number;
    countryId: number;
    electionId: number;
    results: Result[];
}