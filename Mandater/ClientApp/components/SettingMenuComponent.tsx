import * as React from "react";
import { ElectionType } from "../interfaces/ElectionType";

export interface ISettingsProps {
    selectOptions: number[],
    selectedYear: number,
    algorithm: string,
    firstDivisor: number,
    electionThreshold: number,
    districtSeats: number,
    levelingSeats: number,
    electionType: ElectionType,
    updateCalculation: (payload : SettingMenuPayload) => any;
}

export interface SettingMenuPayload {
    year: number,
    electionType: ElectionType,
    algorithm: string,
    firstDivisor: number,
    electionThreshold: number,
    districtSeats: number,
    levelingSeats: number,
}


export class SettingMenuComponent extends React.Component<ISettingsProps, {}> {
    constructor(props : ISettingsProps) {
        super(props);
    }
    
 
    render() {
        const payload: SettingMenuPayload = {
            year : this.props.selectedYear,
            algorithm: this.props.algorithm,
            districtSeats: this.props.districtSeats,
            electionThreshold: this.props.electionThreshold,
            electionType: this.props.electionType,
            firstDivisor: this.props.firstDivisor,
            levelingSeats: this.props.levelingSeats
        }
        return (<div className="settings-menu">
            <h1 className="h2">Stortingsvalg</h1>
            <form>
                <div className="form-group row">
                    <label className="col-sm-5 col-form-label">År</label>
                    <div className="col-sm-7">
                        <select
                            id="year"
                            onChange={
                                (event: React.ChangeEvent<HTMLSelectElement>) => {
                                    this.props.updateCalculation({
                                        ...payload,
                                        year: parseInt(event.target.value)
                                    });
                                }}
                            className="form-control"
                            name="year">
                            {
                                this.props.selectOptions.map((item, index) => {
                                    return (
                                        <option
                                            key={index} // By convention all children should have a unique key prop
                                            value={item}>
                                            {item}
                                        </option>
                                    );
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-5 col-form-label">Algoritme</label>
                    <div className="col-sm-7">
                        <select
                            className="form-control"
                            name="calcMethod"
                            onChange={
                                (event: React.ChangeEvent<HTMLSelectElement>) => {
                                    this.props.updateCalculation({
                                        ...payload,
                                        algorithm: event.target.value
                                    });
                                }
                            }>
                            <option value="SL">Sainte Lagüe</option>
                            <option value="DH">d'Hondt</option>>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="firstDivisor" className="col-sm-5 col-form-label">Første delingstall</label>
                    <div className="col-sm-7">
                        <input
                            className="form-control"
                            classID="firstDivisor"
                            type="number"
                            name="firstDivisor"
                            onChange={
                                (event: React.ChangeEvent<HTMLInputElement>) => {
                                    this.props.updateCalculation({
                                        ...payload,
                                        firstDivisor: parseFloat(event.target.value)
                                    });
                                }
                            }
                            placeholder={this.props.firstDivisor.toString()}
                            value={this.props.firstDivisor.toString()}
                            min="1.0" step="0.1" max="5.0" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="electionThreshold"className="col-sm-5 col-form-label">Sperregrense</label>
                    <div className="col-sm-7">
                        <input
                            className="form-control"
                            classID="electionThreshold"
                            type="number"
                            name="electionThreshold"
                            onChange={
                                (event: React.ChangeEvent<HTMLInputElement>) => {
                                    this.props.updateCalculation({
                                        ...payload,
                                        electionThreshold: parseFloat(event.target.value)
                                    });
                                }
                            }
                            placeholder={this.props.electionThreshold.toString()}
                            value={this.props.electionThreshold.toString()}
                            min="0.0"
                            step="0.1"
                            max="15.0" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="levelingSeat" className="col-sm-5 col-form-label">Utjevningsmandater</label>
                    <div className="col-sm-7">
                        <input
                            className="form-control"
                            classID="levelingSeat"
                            type="number"
                            name="levelingSeat"
                            onChange={
                                (event: React.ChangeEvent<HTMLInputElement>) => {
                                    this.props.updateCalculation({
                                        ...payload,
                                        levelingSeats: parseInt(event.target.value)
                                    });
                                }
                            }
                            placeholder={this.props.levelingSeats.toString()}
                            value={this.props.levelingSeats.toString()}
                            min="0"
                            step="1"
                            max="100" />
                    </div>
                </div>
                {/*<div className="form-group row">
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
