import * as React from 'react';
import { NavMenu } from './NavMenu';
import { SettingMenu } from './SettingMenu';
import { Presentation } from './Presentation';
import { PresentationSettingsContainer } from './PresentationSettingsContainer';
import { initializeParliamentaryElectionData } from '../store/ElectionReducer'
import { connect } from 'react-redux';
import { ApplicationState } from 'ClientApp/store';

export interface layoutProps {
    initializeState: () => any
}

export class _Layout extends React.Component<layoutProps, {}> {
    public componentWillMount() {
        this.props.initializeState();
    }
    public render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div>
                    <NavMenu />
                </div>
                <div className='col-sm-3'>
                    <SettingMenu />
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

const mapStateToProps = (state: ApplicationState) => {
    return {};
}

const mapDispatchToProps = (dispatch: any) => ({
    initializeState: () => {
        console.log("Test1")
        dispatch(initializeParliamentaryElectionData())
        console.log("Test2")
    }
})

export const Layout = connect(mapStateToProps, mapDispatchToProps)(_Layout)