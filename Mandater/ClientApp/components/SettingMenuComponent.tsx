import * as React from 'react';
import { ElectionAlgorithm } from '../logic/Algorithm';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ApplicationState } from '../store/index'
import axios from 'axios';
import { connect } from 'react-redux';

export interface settingsProps {
    selectOptions: number[]
}


export class SettingMenuComponent extends React.Component<settingsProps, {}> {
    handleYearChange(event: any) {
        // TODO: Implement year change (load new data into state)
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
                                this.props.selectOptions.map(function (item, index) {
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