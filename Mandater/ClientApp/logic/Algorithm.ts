import { ComputationPayload } from "../interfaces/ComputationPayload";
import { lagueDhont } from "./LagueDhont";
import { ComputationResults } from "./ComputationResult";

export function computeAlgorithm(payload: ComputationPayload) {
    const lagueDhontSet = lagueDhont(payload);
    return new ComputationResults(lagueDhontSet);
}