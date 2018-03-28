import * as React from 'react';

export class PresentationSettings extends React.Component<{}, {}> {
    public render() {
        return <div className="presentation-settings">
            <h1 className="h2">Presentasjon instillinger</h1>
            <form>
                <div className="form-group row">
                    <label className="col-sm-5 col-form-label">År</label>
                    <div className="col-sm-7">
                        <select className="form-control" name='year'>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                            <option value="2014">2014</option>
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
                <div className="form-group row">
                    <label htmlFor="electionThreshold" className="col-sm-5 col-form-label">Sperregrense</label>
                    <div className="col-sm-7">
                        <input className="form-control" classID="electionThreshold" type="number" name="electionThreshold" placeholder="1.4" min="0.0" step="0.1" max="15.0" />
                    </div>
                </div>
                <div className="form-group row">
                    {/*Utjevningsmandat = Leveling seat as of https://www.dinordbok.no/norsk-engelsk/?q=utjevningsmandat */}
                    <label htmlFor="levelingSeat" className="col-sm-5 col-form-label">Utjevningsmandater</label>
                    <div className="col-sm-7">
                        <input className="form-control" classID="levelingSeat" type="number" name="levelingSeat" placeholder="1.4" min="0.0" step="0.1" max="15.0" />
                    </div>
                </div>
            </form>
        </div>

    }
}