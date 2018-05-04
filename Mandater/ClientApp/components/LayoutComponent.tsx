import * as React from "react";
import { NavMenu } from "../components/NavMenu";
import SettingMenuContainer from "../containers/SettingMenuContainer";
import PresentationContainer from "../containers/PresentationContainer";
import { PresentationMenu } from "../components/PresentationMenu";

interface props {
    initializeState: () => any
}

export class LayoutComponent extends React.Component<props, {}> {
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
                    <SettingMenuContainer />
                </div>
                <div className='col-sm-6'>
                    <PresentationContainer />
                </div>
                <div className='col-sm-3'>
                    <PresentationMenu />
                </div>
            </div>
        </div>;
    }
}