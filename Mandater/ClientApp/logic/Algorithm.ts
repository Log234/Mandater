import { AlgorithmPayload } from "ClientApp/interfaces/AlgorithmPayload";
import { AlgorithmType } from "../enums/AlgorithmEnums";
import { sainteLague } from "./SainteLague";

export  function computeAlgorithm(algorithm: AlgorithmType, payload: AlgorithmPayload) {
    switch (algorithm) {
    case AlgorithmType.SainteLague:
    case AlgorithmType.DHondt:
        return sainteLague(algorithm, payload);
        
    default:
    }
}