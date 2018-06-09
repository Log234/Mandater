import * as React from "react";
import { PresentationType } from "../types/PresentationType";
import { LagueDhontResult } from "../interfaces/LagueDhontResult";
import { ElectionOverview } from "./ElectionOverview";
import { DistrictOverview } from "./DistrictOverview";
import { SeatsPerParty } from "./SeatsPerParty";
import { getDistrictTableData, getPartyTableData, getSeatsPerPartyData } from "../logic/PresentationUtilities";

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
        const currentPresentation = this.props.currentPresentation;
        const decimals = this.props.decimals;
        const showPartiesWithoutSeats = this.props.showPartiesWithoutSeats;
        const results = this.props.results;

        switch (currentPresentation) {
            case PresentationType.ElectionTable:
                return <ElectionOverview partyResults={getPartyTableData(results.partyResults, showPartiesWithoutSeats, decimals)} />;
            case PresentationType.DistrictTable:
                return <DistrictOverview districtResults={getDistrictTableData(results.districtResults, decimals)} />;
            case PresentationType.SeatsPerParty:
                return <SeatsPerParty partyResults={getSeatsPerPartyData(results.partyResults, showPartiesWithoutSeats)} />;
            default:
                console.log(`Could not find presentation type ${currentPresentation}`);
                return <g />;
        }
    }
}
