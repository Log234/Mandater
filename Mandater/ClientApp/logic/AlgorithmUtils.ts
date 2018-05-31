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
