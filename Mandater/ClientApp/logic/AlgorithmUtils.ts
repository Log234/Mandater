import { ProcessedResult } from "../interfaces/ProcessedResult";
import { AlgorithmType } from "../types/AlgorithmType";


const illegalPartyCodes: Set<string> = new Set(["BLANKE"]);

export function distributeSeats(algorithm: AlgorithmType, firstDivisor: number, numSeats: number, offset: number, end: number, processedResults: ProcessedResult[]) {
    let tmp = 0;
    for (let i: number = 0; i < numSeats; i++) {
        let currentWinnerIndex = -1;
        let currentMaxQuotient: number = -1;
        for (let j: number = offset; j < end + offset; j++) {
            let currentParty: ProcessedResult = processedResults[j];
            let currentQuotient: number = (currentParty.votes / getDenominator(algorithm, currentParty.seats, firstDivisor));
            if (currentQuotient > currentMaxQuotient && !illegalPartyCodes.has(currentParty.partyCode)) {
                currentMaxQuotient = currentQuotient;
                currentWinnerIndex = j;
            }
        }
        processedResults[currentWinnerIndex].seats += 1;
        tmp += 1;
    }
    return processedResults;
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
