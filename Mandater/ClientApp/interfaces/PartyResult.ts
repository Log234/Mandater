export interface PartyResult {
    /** The partyCode associated with the party */
    partyCode: string;
    /** The party name of the party */
    partyName: string;
    /** The number of votes the party received, either nationally or within the district */
    votes: number;
    /** The percent of votes the party received, either nationally or within the district */
    percentVotes: number;
    /** The number of seats the party received, either nationally or within the district */
    districtSeats: number;
    /** The number of leveling seats the party received nationally (always 0 if the PartyResult is within a district) */
    levelingSeats: number;
    /** The total number of seats the party received natioanlly or within the district */
    totalSeats: number;
}