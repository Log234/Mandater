import * as React from "react";
import { PresentationType } from "../types/PresentationType";
import { LagueDhontResult } from "../interfaces/LagueDhontResult";
import { ElectionOverview } from "./ElectionOverview";
import { DistrictOverview } from "./DistrictOverview";
import { SeatsPerParty } from "./SeatsPerParty";

export interface PresentationProps {
    currentPresentation: PresentationType;
    decimals: number;
    showPartiesWithoutSeats: boolean;
    results: LagueDhontResult;
}

export class PresentationComponent extends React.Component<
    PresentationProps,
    {}
> {

    render() {
        const tableType = this.props.currentPresentation;
        const decimals = this.props.decimals;
        const showPartiesWithoutSeats = this.props.showPartiesWithoutSeats;
        const results = this.props.results;

        switch (tableType) {
            case PresentationType.ElectionTable:
                return <ElectionOverview decimals={decimals} showPartiesWithoutSeats={showPartiesWithoutSeats} partyResults={results.partyResults} />;
            case PresentationType.DistrictTable:
                return <DistrictOverview showPartiesWithoutSeats={showPartiesWithoutSeats} districtResults={results.districtResults} />;
            case PresentationType.SeatsPerParty:
                return <SeatsPerParty showPartiesWithoutSeats={showPartiesWithoutSeats} partyResults={results.partyResults} />;
            default:
                console.log(`Could not find presentation type ${tableType}`);
                return <g />;
        }
    }
}
