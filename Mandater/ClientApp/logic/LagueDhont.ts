import { ComputationPayload } from "../interfaces/ComputationPayload";
import { distributeSeats } from "./AlgorithmUtils";
import { LagueDhontSets } from "./LagueDhontSets";
import { Result } from "../interfaces/Result";

export function lagueDhont(payload: ComputationPayload): LagueDhontSets {
    const result = new LagueDhontSets();
    const votesPerDistrict: { [id: string]: number } = {};
    const votesPerParty: { [id: string]: number } = {};
    const districtSeatsByParty: { [id: string]: number } = {};
    let totalVotes = 0;

    // Assemble a list of all parties as well as the number of votes per district
    for (const county of payload.election.counties) {
        votesPerDistrict[county.name] = 0;
        for (const party of county.results) {
            votesPerDistrict[county.name] += party.votes;
            totalVotes += party.votes;
            if (result.partyCodes.indexOf(party.partyCode) === -1) {
                result.partyCodes.push(party.partyCode);
                result.partyNames.push(party.partyName);
                votesPerParty[party.partyCode] = party.votes;
            } else {
                votesPerParty[party.partyCode] += party.votes;
            }
        }
    }

    // Create headers for state-wide tables
    result.votesPerDistrict.header = ["Fylke", ...result.partyCodes];
    result.percentPerDistrict.header = ["Fylke", ...result.partyCodes];
    result.districtSeatsPerDistrict.header = ["Fylke", ...result.partyCodes];

    // st. lague iterates over each county, and in turn, each party of the party, so first we have to create objects for partyCodes
    let index = 0;
    for (const county of payload.election.counties) {
        result.districts.push(county.name);
        result.districtTables[county.name] = distributeSeats(payload.algorithm, payload.firstDivisor, county.seats, county.results);

        // Append the county name as the row ID
        result.votesPerDistrict.rowId.push(county.name);
        result.percentPerDistrict.rowId.push(county.name);
        result.districtSeatsPerDistrict.rowId.push(county.name);

        // Create a new row in the tables
        result.votesPerDistrict.body.push(Array(result.partyCodes.length).fill(0));
        result.percentPerDistrict.body.push(Array(result.partyCodes.length).fill(0));
        result.districtSeatsPerDistrict.body.push(Array(result.partyCodes.length).fill(0));

        const distTables = result.districtTables[county.name];
        for (const party of county.results) {
            const partyIndex = result.partyCodes.indexOf(party.partyCode);

            // Add values for each party in the table
            result.votesPerDistrict.body[index][partyIndex] = party.votes;
            result.percentPerDistrict.body[index][partyIndex] = (party.votes / votesPerDistrict[county.name]) * 100;
            result.districtSeatsPerDistrict.body[index][partyIndex] = distTables.seatsWonByParty.body[0][distTables.partyIndex[party.partyCode]];

            if (districtSeatsByParty[party.partyCode] === undefined) {
                districtSeatsByParty[party.partyCode] = result.districtSeatsPerDistrict.body[index][partyIndex];
            } else {
                districtSeatsByParty[party.partyCode] += result.districtSeatsPerDistrict.body[index][partyIndex];
            }
        }

        index++;
    }

    // Filter out parties with less than the threshold
    let levelingPartyCodes = result.partyCodes.filter(p => (votesPerParty[p] / totalVotes) * 100 >= payload.electionThreshold);
    let levelingParties: Result[] = [];
    for (const partyCode of levelingPartyCodes) {
        const party: Result = {
            countyId: -1,
            electionId: -1,
            partyId: -1,
            resultId: -1,
            countyName: "",
            partyCode,
            partyName: "",
            votes: votesPerParty[partyCode],
            percentage: -1
        };
        levelingParties.push(party);
    }

    // Compute the distribution of the total number of seats on the whole country
    const nationalDistribution = distributeSeats(payload.algorithm, payload.firstDivisor, payload.districtSeats + payload.levelingSeats,
        levelingParties);

    // Filter out parties that did not gain any seats in the new distribution
    levelingPartyCodes =
        levelingPartyCodes.filter(p => nationalDistribution.seatsWonByParty.body[0][nationalDistribution.partyIndex[p]] >
            districtSeatsByParty[p]);

    levelingParties = [];
    for (const partyCode of levelingPartyCodes) {
        const party: Result = {
            countyId: -1,
            electionId: -1,
            partyId: -1,
            resultId: -1,
            countyName: "",
            partyCode,
            partyName: "",
            votes: votesPerParty[partyCode],
            percentage: -1
        };
        levelingParties.push(party);
    }

    // Distribute the leveling seats, taking the district seats into account
    result.levelingSeatsTables = distributeSeats(payload.algorithm, payload.firstDivisor, payload.levelingSeats,
        levelingParties,
        districtSeatsByParty);

    return result;
}