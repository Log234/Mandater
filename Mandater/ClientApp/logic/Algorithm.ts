import { ComputationPayload } from "../interfaces/ComputationPayload";
import { sainteLague } from "./SainteLague";

export  function computeAlgorithm(payload: ComputationPayload) {
        return sainteLague(payload);
}