import * as React from "react";
import { SmartNumericInput } from "./SmartNumericInput";
import { LagueDhontResult } from "../interfaces/LagueDhontResult";

export interface PresentationSettingsProps {
    displayedDecimals?: number;
    decimals: string;
    showPartiesWithoutSeats: boolean;
    changeDecimals: (decimals: string, decimalsNumber: number) => void;
    toggleShowPartiesWithoutSeats: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
    newResults: LagueDhontResult;
}
export class PresentationSettings extends React.Component<
    PresentationSettingsProps
> {
    static defaultProps = {} as PresentationSettingsProps;
    onChange() {
        // TODO: Complete function
    }
    createPartyList(): React.ReactNode[] {
        const options = [] as React.ReactNode[];
        this.props.newResults.partyResults.forEach(party => {
            options.push(<option key={party.partyCode}>{party.partyName}</option>);
        });
        return options;
    }

    render() {
        return (
            <div className="presentation-settings">
                <h2>Presentasjonsinnstillinger</h2>
                <form>
                    <div className="form-group row">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="no-seats-setting"
                            checked={this.props.showPartiesWithoutSeats}
                            onChange={this.props.toggleShowPartiesWithoutSeats}
                        />
                        <label htmlFor="no-seats-setting">
                            Vis partier uten mandater
                        </label>
                    </div>
                    <SmartNumericInput
                        name="decimalPlaces"
                        defaultValue={2}
                        min={0}
                        max={16}
                        integer={true}
                        slider={true}
                        title="Antall desimaler"
                        value={this.props.decimals}
                        onChange={this.props.changeDecimals}
                    />
                    <div className="form-group row">
                        <label htmlFor="chosen-partyCodes">
                            Valgte partier
                        </label>
                        <select style={{ width: "100%" }} multiple>
                            {this.createPartyList()}
                        </select>
                        <button type="button" className="btn btn-block">
                            Fjern partier
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
