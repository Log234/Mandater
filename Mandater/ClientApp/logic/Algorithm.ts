import { AlgorithmPayload } from "ClientApp/interfaces/AlgorithmPayload";
import { sainteLague } from "./SainteLague";

export  function computeAlgorithm(payload: AlgorithmPayload) {
        return sainteLague(payload);
}