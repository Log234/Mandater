import { ProcessedResult } from "ClientApp/interfaces/ProcessedResult";
import { AlgorithmType } from "../enums/AlgorithmEnums";

export function distributeSeats(algorithm: AlgorithmType, firstDivisor: number, numSeats: number, offset: number, end: number, processedResults: ProcessedResult[]) {
    let tmp = 0;
    for (let i: number = 0; i < numSeats; i++) {
        let currentWinnerIndex = -1;
        let currentMaxQuotient: number = -1;
        for (let j: number = offset; j < end + offset; j++) {
            let currentParty: ProcessedResult = processedResults[j];
            let currentQuotient: number = (currentParty.votes / getDenominator(algorithm, currentParty.seats, firstDivisor));
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

export function getDenominator(algorithm: AlgorithmType, numberOfSeatsAssigned: number, firstDivisor: number) {
    if (algorithm === AlgorithmType.SainteLague) {
        if (numberOfSeatsAssigned === 0) {
            return firstDivisor;
        } else {
            return (2 * numberOfSeatsAssigned + 1);
        }
    } else {
        return numberOfSeatsAssigned + 1;
    }
}

export function getAlgorithmType(type: number) {
    if (type === 1) {
        return AlgorithmType.SainteLague;
    } else {
        return AlgorithmType.DHondt;
    }
}