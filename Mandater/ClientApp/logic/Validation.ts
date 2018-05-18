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