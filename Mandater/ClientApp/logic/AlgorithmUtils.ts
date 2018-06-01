import { AlgorithmType } from "../types/AlgorithmType";
import { Result } from "../interfaces/Result";
import { DecomposedTable } from "../interfaces/DecomposedTable";

export interface LagueDhontDistributionResult {
    partyIndex: { [id: string]: number },
    quotientsPerSeat: DecomposedTable<number>,
    winnerPerSeat: DecomposedTable<number>,
    seatsWonByParty: DecomposedTable<number>;
}

const illegalPartyCodes = new Set(["BLANKE"]);

/**
 * Distributes a number of seats on a set of parties, based on their number of votes,
 * how many seats they already received (if applicable) and a specific algorithm.
 * 
 * @param algorithm The type of algorithm in use
 * @param firstDivisor The first divisor to use
 * @param numSeats Number of seats to distribute
 * @param results A list of how many votes each party received
 * @param seats [optional] If a number of seats have been distributed, this parameter can be specified to continue from the existing distribution
 */
export function distributeSeats(algorithm: AlgorithmType, firstDivisor: number, numSeats: number, results: Result[], seats?: {[id: string]: number}): LagueDhontDistributionResult {
    let seatsWon: { [id: string]: number } = {};

    if (seats === undefined) {
        for (let party of results) {
            seatsWon[party.partyCode] = 0;
        }
    } else {
        seatsWon = seats;
    }
    
    const partyIndex: { [id: string]: number } = {};
    const quotientsPerSeat: DecomposedTable<number> = {
        header: ["Mandat"],
        rowId: [],
        body: []
    }
    const winnerPerSeat: DecomposedTable<number> = {
        header: ["Mandat"],
        rowId: [],
        body: []
    }
    const seatsWonByParty: DecomposedTable<number> = {
        header: [""],
        rowId: ["Antall"],
        body: []
    }

    let index = 0;
    for (let party of results) {
        partyIndex[party.partyCode] = index;
        quotientsPerSeat.header.push(party.partyCode);
        winnerPerSeat.header.push(party.partyCode);
        seatsWonByParty.header.push(party.partyCode);
        index++;
    }

    seatsWonByParty.body.push(Array(results.length).fill(0));

    for (let i: number = 0; i < numSeats; i++) {
        const seatNumber = (i + 1).toString();
        quotientsPerSeat.rowId.push(seatNumber);
        winnerPerSeat.rowId.push(seatNumber);

        const quotients = Array(results.length).fill(0);
        const winner = Array(results.length).fill(0);

        let currentWinner = "";
        let currentMaxQuotient = -1;

        for (let result of results) {
            const currentQuotient = (result.votes / getDenominator(algorithm, seatsWon[result.partyCode], firstDivisor));
            quotients[partyIndex[result.partyCode]] = currentQuotient;

            if (currentQuotient > currentMaxQuotient && !illegalPartyCodes.has(result.partyCode)) {
                currentMaxQuotient = currentQuotient;
                currentWinner = result.partyCode;
            }
        }
        seatsWonByParty.body[0][partyIndex[currentWinner]] += 1;
        seatsWon[currentWinner] += 1;
        winner[partyIndex[currentWinner]] = 1;
        winnerPerSeat.body.push(winner);
    }

    const completedResult: LagueDhontDistributionResult =
        {
            partyIndex,
            quotientsPerSeat,
            winnerPerSeat,
            seatsWonByParty
        }

    return completedResult;
}

/**
 * Returns a denominator based on an algorithm, the number of seats the party has
 * and a first divisor
 * 
 * @param algorithm The algorithm to get the denominator for
 * @param numberOfSeatsAssigned The number of seats assigned to the party in question
 * @param firstDivisor The first divisor to use if the party has 0 seats
 */
export function getDenominator(algorithm: AlgorithmType, numberOfSeatsAssigned: number, firstDivisor: number) {
    switch (algorithm) {
        case AlgorithmType.SainteLague:
            if (numberOfSeatsAssigned === 0) {
                return firstDivisor;
            } else {
                return (2 * numberOfSeatsAssigned + 1);
            }
        case AlgorithmType.DHondt:
            return numberOfSeatsAssigned + 1;
        default:
            console.error(`ERROR! ${algorithm.toString()} does not have an associated denominator function!`);
            return Number.MIN_SAFE_INTEGER;
    }
}

/**
 * Converts numerical IDs into their matching algorithm types
 * 
 * @param type The numerical ID of the algorithm
 */
export function getAlgorithmType(type: number) {
    switch (type) {
        case 1:
            return AlgorithmType.SainteLague;
        case 2:
            return AlgorithmType.DHondt;
        default:
            return AlgorithmType.Undefined;
    }
}
