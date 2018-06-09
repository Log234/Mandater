import * as React from "react";
import { PresentationType } from "../types/PresentationType";
import { LagueDhontResult } from "../interfaces/LagueDhontResult";
import { ElectionOverview } from "./ElectionOverview";
import { DistrictOverview } from "./DistrictOverview";
import { SeatsPerParty } from "./SeatsPerParty";
import { getDistrictTableData, getPartyTableData, getSeatsPerPartyData } from "../logic/PresentationUtilities";
import { PartyResult } from "../interfaces/PartyResult";
import { DistrictResult } from "../interfaces/DistrictResult";

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
    getPartyTableData(): PartyResult[] {
        return getPartyTableData(this.props.results.partyResults, this.props.showPartiesWithoutSeats, this.props.decimals);
    }

    getDistrictTableData(): DistrictResult[] {
        return getDistrictTableData(this.props.results.districtResults, this.props.decimals);
    }

    getSeatsPerPartyData(): PartyResult[] {
        return getSeatsPerPartyData(this.props.results.partyResults, this.props.showPartiesWithoutSeats);
    }

    render() {
        switch (this.props.currentPresentation) {
            case PresentationType.ElectionTable:
                return <ElectionOverview partyResults={this.getPartyTableData()} />;
            case PresentationType.DistrictTable:
                return <DistrictOverview districtResults={this.getDistrictTableData()} />;
            case PresentationType.SeatsPerParty:
                return <SeatsPerParty partyResults={this.getSeatsPerPartyData()} />;
            default:
                console.log(`Could not find presentation type ${this.props.currentPresentation}`);
                return <g />;
        }
    }
}
