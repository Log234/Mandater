import { SettingsMenuPayload } from "../interfaces/SettingsMenuPayload";

export function validateNumber(value: number, min?: number, max?: number, integer?: boolean) {
    if (isNaN(value)) {
        return false;
    }

    if (min !== undefined) {
        if (min > value) return false;
    }

    if (max !== undefined) {
        if (max < value) return false;
    }

    if (integer !== undefined) {
        if (Number.isInteger(value) !== integer) return false;
    }

    return true;
}

export function validateFirstDivisor(firstDivisor: number) {
    return validateNumber(firstDivisor, 1, 5);
}

export function validateElectionThreshold(electionThreshold: number) {
    return validateNumber(electionThreshold, 0, 15);
}

export function validateDistrictSeats(districtSeats: number) {
    return validateNumber(districtSeats, 0, 500, true);
}

export function validateLevelingSeats(levelingSeats: number) {
    return validateNumber(levelingSeats, 0, 100, true);
}

export function validateSettings(payload: SettingsMenuPayload) {
    return (validateFirstDivisor(payload.firstDivisor) &&
            validateElectionThreshold(payload.electionThreshold) &&
            validateDistrictSeats(payload.districtSeats) &&
            validateLevelingSeats(payload.levelingSeats));
}