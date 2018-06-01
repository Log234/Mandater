import * as React from "react";
import { SmartNumericInput } from "./SmartNumericInput";
import { ComputationResults } from "../logic/ComputationResult";

export interface PresentationSettingsProps {
    displayedDecimals?: number,
    decimals: string,
    changeDecimals: (decimals: string, decimalsNumber: number) => void,
    results: ComputationResults;
}
export class PresentationSettings extends React.Component<PresentationSettingsProps> {
    static defaultProps = {

    } as PresentationSettingsProps;
    onChange() {
        // TODO: Complete function
    }
    createPartyList() {
        const options = [] as React.ReactNode[];
        const partyNames = this.props.results.getPartyNames();
        const partyCodes = this.props.results.getPartyCodes();

        for (let i = 0; i < partyCodes.length; i++) {
            options.push(<option key={partyCodes[i]}>{partyNames[i]}</option>);
        }
        return options;
    }
    
    
    render() {
        return <div className="presentation-settings">
            <h2>Presentasjonsinnstillinger</h2>
            <form>
                <div className="form-group row">
                    <input className="form-check-input" type="checkbox" name="no-seats-setting" />
                    <label htmlFor="no-seats-setting">Vis partier uten mandater</label>
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
                    <label htmlFor="chosen-partyCodes">Valgte partier</label>
                    <select style={{width:"100%"}} multiple>
                        {this.createPartyList()}
                    </select>
                    <button type="button" className="btn btn-block">Fjern partier</button>
                </div>
            </form>
        </div>;

    }
}