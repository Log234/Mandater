﻿import { ComputationPayload } from "../interfaces/ComputationPayload";
import { distributeSeats, getDenominator } from "./AlgorithmUtilsNew";
import { LagueDhontSets } from "./LagueDhontSets";
import { Result } from "../interfaces/Result";
import { Dictionary } from "../interfaces/Dictionary";
import { PartyResult } from "../interfaces/PartyResult";
import { DistrictResult } from "../interfaces/DistrictResult";
import { LagueDhontResult } from "../interfaces/LagueDhontResult";
import { LevelingSeat } from "../interfaces/LevelingSeat";
import { PartyRestQuotients } from "../interfaces/PartyRestQuotients";
import { distributeLevelingSeats } from "./DistributeLevelingSeats";
import { dictionaryToArray } from "./DictionaryUtilities";

export function lagueDhont(payload: ComputationPayload): LagueDhontResult {
    const partyResults: Dictionary<PartyResult> = {};
    const districtPartyResults: Dictionary<Dictionary<PartyResult>> = {};
    const districtResults: Dictionary<DistrictResult> = {};

    let totalVotes = 0;

    // Assemble a list of all parties as well as the number of votes per district
    for (const county of payload.election.counties) {
        districtResults[county.name] = {
            name: county.name,
            districtSeats: county.seats,
            votes: 0,
            percentVotes: 0,
            districtSeatResult: [],
            partyResults: []
        };
        districtPartyResults[county.name] = {};
        for (const party of county.results) {
            totalVotes += party.votes;

            districtResults[county.name].votes += party.votes;
            districtPartyResults[county.name][party.partyCode] = {
                partyCode: party.partyCode,
                partyName: party.partyName,
                votes: party.votes,
                percentVotes: 0,
                districtSeats: 0,
                levelingSeats: 0,
                totalSeats: 0
            };
            if (partyResults[party.partyCode] === undefined) {
                partyResults[party.partyCode] = {
                    partyCode: party.partyCode,
                    partyName: party.partyName,
                    votes: party.votes,
                    percentVotes: 0,
                    districtSeats: 0,
                    levelingSeats: 0,
                    totalSeats: 0
                };
            } else {
                partyResults[party.partyCode].votes += party.votes;
            }
        }
    }

    // Update percentages as all votes are counted
    for (const county of payload.election.counties) {
        districtResults[county.name].percentVotes =
            (districtResults[county.name].votes / totalVotes) * 100;
        for (const party of county.results) {
            partyResults[party.partyCode].percentVotes =
                (partyResults[party.partyCode].votes / totalVotes) * 100;
            districtPartyResults[county.name][party.partyCode].percentVotes =
                (districtPartyResults[county.name][party.partyCode].votes /
                    districtResults[county.name].votes) *
                100;
        }
    }

    // st. lague iterates over each county, and in turn, each party of the party, so first we have to create objects for partyCodes
    for (const county of payload.election.counties) {
        const distributionResult = distributeSeats(
            payload.algorithm,
            payload.firstDivisor,
            county.seats,
            county.results
        );

        districtResults[county.name].districtSeatResult =
            distributionResult.seatResults;

        // Update how many district seats the party has won, both nationally and within the district
        for (const partyCode in distributionResult.seatsWon) {
            partyResults[partyCode].districtSeats +=
                distributionResult.seatsWon[partyCode];
            partyResults[partyCode].totalSeats +=
                distributionResult.seatsWon[partyCode];
            districtPartyResults[county.name][partyCode].districtSeats +=
                distributionResult.seatsWon[partyCode];
            districtPartyResults[county.name][partyCode].totalSeats +=
                distributionResult.seatsWon[partyCode];
        }
    }

    const levelingSeatDistribution = distributeLevelingSeats(
        payload,
        partyResults,
        districtPartyResults,
        districtResults
    );

    for (const countyName in districtPartyResults) {
        districtResults[countyName].partyResults = dictionaryToArray(districtPartyResults[countyName]);
    }
    const districtResultArray = dictionaryToArray(districtResults);
    const partyResultArray = dictionaryToArray(partyResults);


    const result: LagueDhontResult = {
        partyResults: partyResultArray,
        districtResults: districtResultArray,
        levelingSeatDistribution
    };

    return result;
}
