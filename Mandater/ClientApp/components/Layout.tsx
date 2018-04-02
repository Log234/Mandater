import * as React from 'react';
import { NavMenu } from './NavMenu';
import { SettingsMenu } from './SettingsMenu';
import { Presentation } from './Presentation';
import { PresentationSettingsContainer } from './PresentationSettingsContainer';

export class Layout extends React.Component<{}, {}> {
    public render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div>
                    <NavMenu />
                </div>
                <div className='col-sm-3'>
                    <SettingsMenu />
                </div>
                <div className='col-sm-6'>
                    <Presentation />
                </div>
                <div className='col-sm-3'>
                    <PresentationSettingsContainer />
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
