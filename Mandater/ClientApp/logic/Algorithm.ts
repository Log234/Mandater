import { Election } from "ClientApp/interfaces/Election";
import { ProcessedResult } from "ClientApp/interfaces/ProcessedResult";
import { PartyResult } from "ClientApp/interfaces/PartyResult";
import { PartyResultDictionary } from "ClientApp/interfaces/PartyResultDictionary";

export class ElectionAlgorithm {
    election: Election;

    constructor(election: Election) {
        this.election = election;
    }

    set algorithm(id: number) {
        this.algorithm = id;
    }

    set firstDivisor(newNumber: number) {
        this.election.firstDivisor = newNumber;
    }

    public modifiedSaintLague() {
        // st. lague iterates over each county, and in turn, each party of the party, so first we have to create objects for parties
        let processedResults: Array<ProcessedResult> = [];
        for (let county of this.election.counties) {

            for (let currentResult of county.results) {
                let currentParty: ProcessedResult = {
                    countyName: currentResult.countyName,
                    partyName: currentResult.partyName,
                    partyCode: currentResult.partyCode,
                    votes: currentResult.votes,
                    seats: 0
                };
                processedResults.push(currentParty);
            }
        }
        let offset: number = 0;
        for (let county of this.election.counties) {
            processedResults = this.distributeSeats(county.seats, offset, county.results.length, processedResults);
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

        for (let result in partyResults) {
            if (partyResults.hasOwnProperty(result)) {
                partyResults[result].percent = (partyResults[result].totalVotes / total) * 100;
                partyResults[result].percent = Math.round(partyResults[result].percent * 100) / 100;
            }
        }
        return partyResults;
    }

    distributeSeats(numSeats: number, offset: number, end: number, processedResults: ProcessedResult[]) {
        for (let i: number = 0; i < numSeats; i++) {
            let currentWinnerIndex = -1;
            let currentMaxQuotient: number = -1;
            for (let j: number = offset; j < end + offset; j++) {
                let currentParty: ProcessedResult = processedResults[j];
                let currentQuotient: number = (currentParty.votes / this.getQuotient(currentParty.seats));
                if (currentQuotient > currentMaxQuotient) {
                    currentMaxQuotient = currentQuotient;
                    currentWinnerIndex = j;
                }
            }
            processedResults[currentWinnerIndex].seats += 1;
        }

        return processedResults;
    }

    getQuotient(numberOfSeatsAssigned: number) {
        if (numberOfSeatsAssigned === 0) {
            return this.election.firstDivisor;
        } else {
            return (2 * numberOfSeatsAssigned + 1);
        }
    }

    calculate(){
        switch (this.algorithm) {
        case 1:
            return this.modifiedSaintLague();
        default:
            console.log("Non-existent algorithm choice in calculate().");
        };
    }
 }