import { ProcessedResult } from "../interfaces/ProcessedResult";
import { AlgorithmPayload } from "../interfaces/AlgorithmPayload";
import { PartyResultDictionary } from "ClientApp/interfaces/PartyResultDictionary";
import { distributeSeats } from "./AlgorithmUtils";
import { AlgorithmType } from "../types/Algorithms";

export function sainteLague(payload: AlgorithmPayload) {
    let election = payload.election;
    // st. lague iterates over each county, and in turn, each party of the party, so first we have to create objects for parties
    let processedResults: Array<ProcessedResult> = [];
    for (let county of election.counties) {

        for (let currentResult of county.results) {
            let currentParty: ProcessedResult = {
                countyName: county.name,
                partyName: currentResult.partyName,
                partyCode: currentResult.partyCode,
                votes: currentResult.votes,
                seats: 0
            };
            processedResults.push(currentParty);
        }
    }
    let offset: number = 0;
    for (let county of election.counties) {
        processedResults = distributeSeats(payload.algorithm, payload.firstDivisor, county.seats, offset, county.results.length, processedResults);
        offset += county.results.length;
    }
    let partyResults: PartyResultDictionary = {};
    let total: number = 0;
    for (let result of processedResults) {
        if (partyResults[result.partyName] == undefined) {
            partyResults[result.partyName] = {
                partyName: result.partyName,
                partyCode: result.partyCode,
                resultsPerCounty: [],
                districtSeats: 0,
                levelingSeats: 0,
                sum: 0,
                percent: 0,
                totalVotes: 0,
            };
        }
        partyResults[result.partyName].resultsPerCounty.push(result);
        partyResults[result.partyName].districtSeats += result.seats;
        partyResults[result.partyName].sum += result.seats;
        partyResults[result.partyName].totalVotes += result.votes;
        total += result.votes;
    }

    let filteredResults: ProcessedResult[] = [];
    for (let result in partyResults) {
        if (partyResults.hasOwnProperty(result)) {
            partyResults[result].percent = (partyResults[result].totalVotes / total) * 100;
            if (partyResults[result].percent >= payload.electionThreshold) {
                filteredResults.push({
                    partyCode: partyResults[result].partyCode,
                    partyName: partyResults[result].partyName,
                    countyName: "NO",
                    votes: partyResults[result].totalVotes,
                    seats: 0
                });
            }
            partyResults[result].percent = Math.round(partyResults[result].percent * 100) / 100;
        }
    }

    filteredResults = distributeSeats(payload.algorithm, payload.firstDivisor, payload.districtSeats + payload.levelingSeats,
        0,
        filteredResults.length,
        filteredResults);
    let filteredStgTwo: ProcessedResult[] = [];
    for (let result of filteredResults) {
        if (result.seats > partyResults[result.partyName].districtSeats) {
            filteredStgTwo.push({
                partyCode: result.partyCode,
                partyName: result.partyName,
                countyName: result.countyName,
                votes: result.votes,
                seats: partyResults[result.partyName].districtSeats
            });
        }
    }

    filteredStgTwo = distributeSeats(payload.algorithm, payload.firstDivisor, payload.levelingSeats,
        0,
        filteredStgTwo.length,
        filteredStgTwo);
    for (let result of filteredStgTwo) {
        let name = result.partyName;
        partyResults[name].levelingSeats = result.seats - partyResults[name].districtSeats;
        partyResults[name].sum += partyResults[name].levelingSeats;
    }
    return partyResults;
}