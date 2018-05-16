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

        let filteredResults: ProcessedResult[] = [];
        for (let result in partyResults) {
            if (partyResults.hasOwnProperty(result)) {
                partyResults[result].percent = (partyResults[result].totalVotes / total) * 100;
                if (partyResults[result].percent >= 4) {
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

        filteredResults = this.distributeSeats(this.election.seats + this.election.levelingSeats,
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

        filteredStgTwo = this.distributeSeats(this.election.levelingSeats,
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

    distributeSeats(numSeats: number, offset: number, end: number, processedResults: ProcessedResult[]) {
        let tmp = 0;
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
            tmp += 1;
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