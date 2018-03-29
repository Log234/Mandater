import * as React from 'react';
import { NavMenu } from './NavMenu';
import { SettingMenu } from './SettingMenu';
import { Graph } from './Graph'

export class Layout extends React.Component<{}, {}> {
    public render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div>
                    <NavMenu />
                </div>
                <div className='col-sm-3'>
                    <SettingMenu />
                </div>
                <div className='col-sm-8'>
                    <Graph />
                </div>

                {/*
                    -------
                    Old code only for ref
                    -------
                    <div className='col-sm-9'>
                        { this.props.children }
                    </div>
                */}
            </div>
        </div>;
    }
}
