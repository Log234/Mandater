import * as React from "react";
import { default as PresentationSelectionButton } from "../containers/PresentationSelectionButtonContainer";
import { PresentationType } from "../types/PresentationType";
import { PartyResultDictionary } from "../interfaces/PartyResultDictionary";

export interface PresentationSelectionProps {
    currentSelection: PresentationType,
    results : PartyResultDictionary
}

export class PresentationSelection extends React.Component {
    static defaultProps = {
        currentSelection: PresentationType.ElectionTable
    } as PresentationSelectionProps
    constructor(props: PresentationSelectionProps) {
        super(props);
    }
    populatePartyChoices() {

    }

    render() {
        return <div className="presentation-selection">
            <h2>Presentasjonstyper</h2>
            <PresentationSelectionButton
                className="btn-block"
                title={"Landsoversikt"}
                presentationSelected={PresentationType.ElectionTable} />
            <PresentationSelectionButton
                className="btn-block"
                title={"Distriktsoversikt"}
                presentationSelected={PresentationType.DistrictTable} />
        </div>;

    }
}