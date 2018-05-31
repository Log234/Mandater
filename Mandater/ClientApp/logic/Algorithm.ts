import { ComputationPayload } from "../interfaces/ComputationPayload";
import { lagueDhont as sainteLague } from "./SainteLague";

export  function computeAlgorithm(payload: ComputationPayload) {
        return sainteLague(payload);
}