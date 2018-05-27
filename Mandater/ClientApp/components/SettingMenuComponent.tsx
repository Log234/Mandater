import * as React from "react";
import { SettingsPayload } from "../interfaces/SettingsPayload";
import { getAlgorithmType } from "../logic/AlgorithmUtils";
import { Button } from "./Button";
import { ComputationPayload } from "../interfaces/ComputationPayload";
import { Election } from "../interfaces/Election";
import { ElectionType } from "../interfaces/ElectionType";

export interface ISettingsProps {
    electionType: ElectionType,
    settingsPayload: SettingsPayload,
    computationPayload: ComputationPayload,
    updateCalculation: (computationPayload: ComputationPayload, autoCompute: boolean, forceCompute: boolean) => any,
    updateSettings: (settingsPayload: SettingsPayload) => any,
    toggleAutoCompute: (autoCompute: boolean) => any,
    resetToHistoricalSettings: (settingsPayload: SettingsPayload, election: Election) => any;
}


export class SettingMenuComponent extends React.Component<ISettingsProps, {}> {
    render() {
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
                                    const year = parseInt(event.target.value);
                                    const election = this.props.electionType.elections.find(election => election.year === year);
                                    if (election !== undefined) {
                                        this.props.updateCalculation({
                                            ...this.props.computationPayload,
                                            counties: election.counties
                                        }, this.props.settingsPayload.autoCompute, false);
                                        this.props.updateSettings({
                                            ...this.props.settingsPayload,
                                            year: event.target.value
                                        });
                                    }
                                }}
                            className="form-control"
                            name="year">
                            {
                                this.props.settingsPayload.electionYears.map((item, index) => {
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
                                    const algorithm = parseInt(event.target.value);
                                    this.props.updateCalculation({
                                        ...this.props.computationPayload,
                                        algorithm: getAlgorithmType(algorithm)
                                    }, this.props.settingsPayload.autoCompute, false);
                                    this.props.updateSettings({
                                        ...this.props.settingsPayload,
                                        algorithm: algorithm
                                    });
                                }
                            }>
                            <option value="1">Sainte Lagüe</option>
                            <option value="2">d'Hondt</option>>
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
                                    const firstDivisor = parseFloat(event.target.value);
                                    this.props.updateCalculation({
                                        ...this.props.computationPayload,
                                        firstDivisor: firstDivisor
                                    }, this.props.settingsPayload.autoCompute, false);
                                    this.props.updateSettings({
                                        ...this.props.settingsPayload,
                                        firstDivisor: event.target.value
                                    });
                                }
                            }
                            placeholder={this.props.settingsPayload.firstDivisor}
                            value={this.props.settingsPayload.firstDivisor}
                            min="1.0" step="0.1" max="5.0" />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="electionThreshold" className="col-sm-5 col-form-label">Sperregrense</label>
                    <div className="col-sm-7">
                        <input
                            className="form-control"
                            classID="electionThreshold"
                            type="number"
                            name="electionThreshold"
                            onChange={
                                (event: React.ChangeEvent<HTMLInputElement>) => {
                                    const electionThreshold = parseFloat(event.target.value);
                                    this.props.updateCalculation({
                                        ...this.props.computationPayload,
                                        electionThreshold: electionThreshold
                                    }, this.props.settingsPayload.autoCompute, false);
                                    this.props.updateSettings({
                                        ...this.props.settingsPayload,
                                        electionThreshold: event.target.value
                                    });
                                }
                            }
                            placeholder={this.props.settingsPayload.electionThreshold}
                            value={this.props.settingsPayload.electionThreshold}
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
                                    const levelingSeats = parseInt(event.target.value);
                                    this.props.updateCalculation({
                                        ...this.props.computationPayload,
                                        levelingSeats: levelingSeats
                                    }, this.props.settingsPayload.autoCompute, false);
                                    this.props.updateSettings({
                                        ...this.props.settingsPayload,
                                        levelingSeats: event.target.value
                                    });
                                }
                            }
                            placeholder={this.props.settingsPayload.levelingSeats}
                            value={this.props.settingsPayload.levelingSeats}
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
                <div className="form-group row">
                    <label htmlFor="autoCompute" className="col-sm-5 col-form-label">Oppdater automatisk</label>
                    <div className="col-sm-7">
                        <input
                            className="form-control"
                            classID="autoCompute"
                            style={{ width: "34px", margin: "0px 15px 0px 0px" }}
                            type="checkbox"
                            name="autoCompute"
                            checked={this.props.settingsPayload.autoCompute}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                this.props.toggleAutoCompute(event.target.checked);
                            }} />
                        {!this.props.settingsPayload.autoCompute &&
                            <Button
                                title={"Kalkuler"}
                                onPress={
                                    () => {
                                        const year = parseInt(this.props.settingsPayload.year);
                                        const election = this.props.electionType.elections.find(e => e.year === year);
                                        if (election !== undefined && election !== null) {
                                            this.props.updateCalculation(
                                                {
                                                    counties: election.counties,
                                                    algorithm: getAlgorithmType(this.props.settingsPayload.algorithm),
                                                    firstDivisor: parseFloat(this.props.settingsPayload.firstDivisor),
                                                    electionThreshold: parseFloat(this.props.settingsPayload.electionThreshold),
                                                    districtSeats: parseInt(this.props.settingsPayload.districtSeats),
                                                    levelingSeats: parseInt(this.props.settingsPayload.levelingSeats)
                                                },
                                                this.props.settingsPayload.autoCompute,
                                                true);
                                        }
                                    }
                                }
                                type="button" />}
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="reset" className="col-sm-5 col-form-label">Historiske instillinger</label>
                    <div className="col-sm-7">
                        <Button title={"Gjenopprett"}
                            onPress={
                                () => {
                                    const election = this.props.electionType.elections.find(e => e.year === parseInt(this.props.settingsPayload.year));
                                    if (election !== undefined) {
                                        this.props.resetToHistoricalSettings(this.props.settingsPayload, election);
                                    }
                                }
                            }
                            type="button" />
                    </div>
                </div>
            </form>
        </div>
        );
    }
}
