import { Election } from "ClientApp/logic/interfaces/Election";
import { Result } from "ClientApp/logic/interfaces/Result";
import { County } from "ClientApp/logic/interfaces/County";
import { ProcessedResult } from "ClientApp/logic/interfaces/ProcessedResult";
import { PartyResult } from "ClientApp/logic/interfaces/PartyResult";

export class Algorithm {
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
        let districtSeatIndex: number = 0;
        for (let county of this.election.counties) {

            for (let currentResult of county.results) {
                let currentParty: ProcessedResult = {
                    countyName: currentResult.countyName,
                    partyName: currentResult.partyName,
                    partyCode: currentResult.partyCode,
                    votes: currentResult.votes,
                    seats: 0
                }
                processedResults.push(currentParty);
            }
        }
        let offset: number = 0;
        for (let county of this.election.counties) {
            for (let i: number = 0; i < county.seats; i++) {
                let currentWinnerIndex = -1;
                let currentMaxQuotient: number = -1;
                for (let j: number = offset; j < county.results.length + offset; j++) {
                    let currentParty: ProcessedResult = processedResults[j];
                    let currentQuotient: number = (currentParty.votes / this.getQuotient(currentParty.seats));
                    if (currentQuotient > currentMaxQuotient) {
                        currentMaxQuotient = currentQuotient;
                        currentWinnerIndex = j;
                    }
                }
                processedResults[currentWinnerIndex].seats += 1;
                districtSeatIndex += 1;

            }
            offset += county.results.length;
        }
        let partyResults: { [id: string]: PartyResult } = {};
        for (let result of processedResults) {
            if (partyResults[result.partyName] == undefined) {
                partyResults[result.partyName] = {
                    partyName: result.partyName,
                    partyCode: result.partyCode,
                    resultsPerCounty: [],
                    sum: 0,
                }
            }
            partyResults[result.partyName].resultsPerCounty.push(result);
            partyResults[result.partyName].sum += result.seats;
        }
        return partyResults;
    }

    getQuotient(numberOfSeatsAssigned: number) {
        if (numberOfSeatsAssigned === 0) {
            return this.election.firstDivisor;
        } else {
            return (2 * numberOfSeatsAssigned + 1);
        }
    }

    calculate() {
        switch (this.algorithm) {
            case 1:
                return this.modifiedSaintLague();
            default:
                console.log("Non-existent algorithm choice in calculate().");
        };
    }
}