import * as React from 'react';
import { ElectionAlgorithm } from '../logic/Algorithm';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

export interface settingsProps {

}

export interface settingsState {
    selectedValue: string,
    selectOptions: string[]
}


export class SettingMenu extends React.Component<settingsProps, settingsState> {
    constructor(props : settingsProps) {
        super(props);

        this.state = {
            selectedValue: '',
            selectOptions: []
        }

        this.handleYearChange = this.handleYearChange.bind(this)
    }


    public componentWillMount() {
        // Keep 'this' as reference to component
        const self = this;
        axios
            .get('http://mandater-testing.azurewebsites.net/api/v1.0.0/no?deep=true')
            .then(function (response) {
                let alg = new ElectionAlgorithm(response.data[0].elections[0]);
                console.log(alg.modifiedSaintLague());

                const parliamentElections = response.data[0].elections;
                let peYears = [];   // All years with available parliament election (pe) data
                for (let i = 0; i < parliamentElections.length; i++) {
                    peYears.push(parliamentElections[i].year);
                }
                self.setState({
                    selectedValue: peYears[0],
                    selectOptions: peYears
                });
            }).catch(function (error) { console.log(error) });
    }

    public handleYearChange(event : any) {
        this.setState({ selectedValue: event.target.value });
    }


    render() {
        return (<div className="settings-menu">
            <h1 className="h2">Stortingsvalg</h1>
            <form>
                <div className="form-group row">
                    <label className="col-sm-5 col-form-label">År</label>
                    <div className="col-sm-7">
                        <select id="year" onChange={this.handleYearChange} className="form-control" name='year'>
                            {
                                this.state.selectOptions.map(function (item, index) {
                                    return (
                                        <option
                                            key={index} // By convention all children should have a unique key prop
                                            value={item}
                                        > {item} </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-5 col-form-label">Beregningsmetode</label>
                    <div className="col-sm-7">
                        <select className="form-control" name="calcMethod">
                            <option value="SL">Sainte Lagues</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="firstDivisor" className="col-sm-5 col-form-label">Første delingstall</label>
                    <div className="col-sm-7">
                        <input className="form-control" classID="firstDivisor" type="number" name="firstDivisor" placeholder="1.0" min="1.0" step="0.1" max="5.0" />
                    </div>
                </div>
                {/*<div className="form-group row">
                    <label htmlFor="electionThreshold" className="col-sm-5 col-form-label">Sperregrense</label>
                    <div className="col-sm-7">
                        <input className="form-control" classID="electionThreshold" type="number" name="electionThreshold" placeholder="1.4" min="0.0" step="0.1" max="15.0" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="levelingSeat" className="col-sm-5 col-form-label">Utjevningsmandater</label>
                    <div className="col-sm-7">
                        <input className="form-control" classID="levelingSeat" type="number" name="levelingSeat" placeholder="1.4" min="0.0" step="0.1" max="15.0" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="districtSeat" className="col-sm-5 col-form-label">Distriksmandater</label>
                    <div className="col-sm-7">
                        <input className="form-control" classID="districtSeat" type="number" name="districSeat" min="0" step="1" max="500" />
                    </div>
                </div>*/}
            </form>
        </div>
        );
    }
}