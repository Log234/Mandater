import * as React from "react";
import { ElectionType } from "../interfaces/ElectionType";
import { Election } from "../interfaces/Election";

export interface ISettingsProps {
    selectOptions: number[],
    selectedYear: number,
    firstDivisor: number,
    electionThreshold: number,
    districtSeats: number,
    levelingSeats: number,
    electionType: ElectionType,
    updateCalculation: (year: number, electionType: ElectionType, firstDivisor: number, electionThreshold: number, districtSeats: number, levelingSeats: number) => any;
}


export class SettingMenuComponent extends React.Component<ISettingsProps, {}> {
    render() {
        return (<div className="settings-menu">
            <h1 className="h2">Stortingsvalg</h1>
            <form>
                <div className="form-group row">
                    <label className="col-sm-5 col-form-label">År</label>
                    <div className="col-sm-7">
                        <select id="year" onChange={(event : React.ChangeEvent<HTMLSelectElement>) => this.props.updateCalculation(parseInt(event.target.value), this.props.electionType, this.props.firstDivisor, this.props.electionThreshold, this.props.districtSeats, this.props.levelingSeats)} className="form-control" name="year">
                            {
                                this.props.selectOptions.map(function (item, index) {
                                    return (
                                        <option
                                            key={index} // By convention all children should have a unique key prop
                                            value={item}
                                        > {item} </option>
                                    );
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
                        // TODO: Split long line, add bracket to lambda expression
                        <input className="form-control" classID="firstDivisor" type="number" name="firstDivisor" onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.props.updateCalculation(this.props.selectedYear, this.props.electionType, parseFloat(event.target.value), this.props.electionThreshold, this.props.districtSeats, this.props.levelingSeats)} placeholder={this.props.firstDivisor.toString()} min="1.0" step="0.1" max="5.0" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="electionThreshold" className="col-sm-5 col-form-label">Sperregrense</label>
                    <div className="col-sm-7">
                        <input className="form-control" classID="electionThreshold" type="number" name="electionThreshold" onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.props.updateCalculation(this.props.selectedYear, this.props.electionType, this.props.firstDivisor, parseFloat(event.target.value), this.props.districtSeats, this.props.levelingSeats)} placeholder={this.props.electionThreshold.toString()} min="0.0" step="0.1" max="15.0" />
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
                                    this.props.updateCalculation(
                                        this.props.selectedYear,
                                        this.props.electionType,
                                        this.props.firstDivisor,
                                        this.props.electionThreshold,
                                        this.props.districtSeats,
                                        parseInt(event.target.value));
                                }
                            }
                            placeholder={this.props.levelingSeats.toString()}
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
