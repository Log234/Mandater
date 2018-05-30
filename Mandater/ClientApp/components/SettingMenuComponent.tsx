﻿import * as React from "react";
import { SettingsPayload } from "../interfaces/SettingsPayload";
import { getAlgorithmType } from "../logic/AlgorithmUtils";
import { Button } from "./Button";
import { ComputationPayload } from "../interfaces/ComputationPayload";
import { Election } from "../interfaces/Election";
import { ElectionType } from "../interfaces/ElectionType";
import { SmartNumericInput } from "./SmartNumericInput";

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
        return (
            <div className="settings-menu">
                <h1 className="h2">Stortingsvalg</h1>
                <form>
                    <div className="form-group row">
                        <label className="col-sm-5 col-form-label">År</label>
                        <div className="col-sm-7">
                            <select
                                id="year"
                                value={this.props.settingsPayload.year}
                                onChange={
                                    (event: React.ChangeEvent<HTMLSelectElement>) => {
                                        const year = parseInt(event.target.value);
                                        const election = this.props.electionType.elections.find(election => election.year === year);
                                        if (election !== undefined) {
                                            this.props.updateCalculation({
                                                ...this.props.computationPayload,
                                                election: election
                                            }, this.props.settingsPayload.autoCompute, false);
                                            this.props.updateSettings({
                                                ...this.props.settingsPayload,
                                                year: event.target.value
                                            });
                                        }
                                    }}
                                className="form-control"
                                name="year">
                                { this.props.settingsPayload.electionYears.map((item, index) => {
                                    return (<option
                                                key={index} // By convention all children should have a unique key prop



                                                value={item}>
                                                {item}
                                            </option>);
                                }) }
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-5 col-form-label">Algoritme</label>
                        <div className="col-sm-7">
                            <select
                                className="form-control"
                                name="calcMethod"
                                value={this.props.settingsPayload.algorithm.toString()}
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
                    <SmartNumericInput
                        name="firstDivisor"
                        title="Første delingstall"
                        value={this.props.settingsPayload.firstDivisor}
                        onChange={
                            (stringValue: string, numericValue: number) => {
                                this.props.updateSettings({
                                    ...this.props.settingsPayload,
                                    firstDivisor: stringValue
                                });
                                this.props.updateCalculation({
                                    ...this.props.computationPayload,
                                    firstDivisor: numericValue
                                }, this.props.settingsPayload.autoCompute, false);
                            }
                        }
                        min={1}
                        max={5}
                        defaultValue={this.props.computationPayload.election.firstDivisor}
                        integer={false}
                        slider={false}/>
                    <SmartNumericInput
                        name="electionThreshold"
                        title="Sperregrense"
                        value={this.props.settingsPayload.electionThreshold}
                        onChange={
                            (stringValue: string, numericValue: number) => {
                                this.props.updateSettings({
                                    ...this.props.settingsPayload,
                                    electionThreshold: stringValue
                                });
                                this.props.updateCalculation({
                                    ...this.props.computationPayload,
                                    electionThreshold: numericValue
                                }, this.props.settingsPayload.autoCompute, false);
                            }
                        }
                        min={0}
                        max={15}
                        defaultValue={this.props.computationPayload.election.threshold}
                        integer={false}
                        slider={false}/>
                    <SmartNumericInput
                        name="levelingSeats"
                        title="Utjevningsmandater"
                        value={this.props.settingsPayload.levelingSeats}
                        onChange={
                            (stringValue: string, numericValue: number) => {
                                this.props.updateSettings({
                                    ...this.props.settingsPayload,
                                    levelingSeats: stringValue
                                });
                                this.props.updateCalculation({
                                    ...this.props.computationPayload,
                                    levelingSeats: numericValue
                                }, this.props.settingsPayload.autoCompute, false);
                            }
                        }
                        min={0}
                        max={100}
                        defaultValue={this.props.computationPayload.election.levelingSeats}
                        integer={true}
                        slider={false}/>
                    { /*<div className="form-group row">
                    <label htmlFor="districtSeat" className="col-sm-5 col-form-label">Distriksmandater</label>
                    <div className="col-sm-7">
                        <input className="form-control" classID="districtSeat" type="number" name="districSeat" min="0" step="1" max="500" />
                    </div>
                </div>*/
                    }
                    <div className="form-group row">
                        <label htmlFor="autoCompute" className="col-sm-5 col-form-label">Oppdater automatisk</label>
                        <div className="col-sm-7">
                            <input
                                className="form-control"
                                classID="autoCompute"
                                style={{ width: "34px", margin: "0 15px 0 0" }}
                                type="checkbox"
                                name="autoCompute"
                                checked={this.props.settingsPayload.autoCompute}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    this.props.toggleAutoCompute(event.target.checked);
                                }}/>
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
                                                        election: election,
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
                                        this.props.resetToHistoricalSettings(this.props.settingsPayload, this.props.computationPayload.election);
                                    }
                                }
                                    type="button"/>
                        </div>
                    </div>
                </form>
            </div>
);
}
}
;;