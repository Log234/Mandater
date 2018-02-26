import * as React from 'react';

export class SettingsMenu extends React.Component<{}, {}> {
    public render() {
        return <div className="settings-menu">
            <h1 className="display-4">Stortingsvalg</h1>
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
                        <select className="form-control" name="calcmethod">
                            <option value="SL">Sainte Lagues</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-5 col-form-label">Fylke</label>
                    <div className="col-sm-7">
                        <select className="form-control" name="county">
                            <option value="akerhus">Akershus</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="divnum" className="col-sm-5 col-form-label">Førstedivisor</label>
                    <div className="col-sm-7">
                        <input className="form-control" classID="divnum" type="number" name="divnum" placeholder="1.4" step="0.1" />
                    </div>
                </div>               
            </form>
        </div>

    }
}