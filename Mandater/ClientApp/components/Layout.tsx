import * as React from 'react';
import { NavMenu } from './NavMenu';
import * as SettingMenu from './SettingMenu';
import * as Presentation from './Presentation';
import { PresentationSettingsContainer } from './PresentationSettingsContainer';
import { initializeParliamentaryElectionData } from '../store/ElectionReducer'
import { connect } from 'react-redux';
import { ApplicationState } from 'ClientApp/store';

export interface layoutProps {
    initializeState: () => any
}

export class _Layout extends React.Component<layoutProps, {}> {
    public async componentWillMount() {
        await this.props.initializeState();
    }
    public render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div>
                    <NavMenu />
                </div>
                <div className='col-sm-3'>
                    <SettingMenu.default />
                </div>
                <div className='col-sm-6'>
                    <Presentation.default />
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
    initializeState: async () => {
        console.log("Test1")
        let action = await initializeParliamentaryElectionData()
        dispatch(action)
        console.log("Test2")
    }
})

export const Layout = connect(mapStateToProps, mapDispatchToProps)(_Layout)