import { SettingsMenuPayload } from "../interfaces/SettingsMenuPayload";

export function validateNumber(value: number, min?: number, max?: number, integer?: boolean) {
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

export function validateSettings(payload: SettingsMenuPayload) {
    return (validateNumber(payload.firstDivisor, 1, 5, false) &&
            validateNumber(payload.electionThreshold, 0, 15) &&
            validateNumber(payload.districtSeats, 0, 500, true) &&
            validateNumber(payload.levelingSeats, 0, 100, true));
}