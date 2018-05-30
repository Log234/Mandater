import * as React from "react";
import { PartyResultDictionary } from "../interfaces/PartyResultDictionary";
export interface PresentationSettingsProps {
    displayedDecimals?: number,
    results: PartyResultDictionary;
}
export class PresentationSettings extends React.Component<PresentationSettingsProps> {
    static defaultProps = {

    } as PresentationSettingsProps;
    onChange() {
        // TODO: Complete function
    }
    createPartyList() {
        const options = [] as React.ReactNode[];
        for (let key in this.props.results) {
            if (this.props.results.hasOwnProperty(key)) {
                const result = this.props.results[key];
                options.push(<option key={result.partyCode}>{result.partyName}</option>);
            }
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
                <div className="form-group row">
                    <label style={{width: "100%"}}htmlFor="decimal-places">Antall desimaler</label>
                    <input className="form-control" onChange={this.onChange} type="range" min={2} value={4}  max={16} name="decimal-places-setting" />
                </div>
                <div className="form-group row">
                    <label htmlFor="chosen-parties">Valgte partier</label>
                    <select style={{width:"100%"}} multiple>
                        {this.createPartyList()}
                    </select>
                    <button type="button" className="btn btn-block">Fjern partier</button>
                </div>
            </form>
        </div>;

    }
}