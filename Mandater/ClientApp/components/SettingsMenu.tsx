import * as React from 'react';

export class SettingsMenu extends React.Component<{}, {}> {
    public render() {
        return <div className="settings-menu">
            <h1>Stortingsvalg</h1>
            <form action="" classID='settings-form'>
                År: <select name='year'>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                </select>
                <br />
                Beregningsmetode: <select name="calcmethod">
                    <option value="SL">Sainte Lagues</option>
                </select>
                <br />
                Fylke: <select name="county">
                    <option value="akerhus">Akershus</option>
                </select>
                <br />
                Førstedivisor: <input type="number" name="divnum" placeholder="1.4" step="0.1" />
            </form>
        </div>

    }
}