// Deprecated
import * as React from "react";
import { NavMenu } from "./NavMenu";
import * as SettingMenu from "./SettingMenu";
import * as Presentation from "./Presentation";
import { PresentationMenu } from "./PresentationMenu";
import { initializeParliamentaryElectionData } from "../store/ElectionReducer"
import { connect } from "react-redux";
import { ApplicationState } from "../store";
import PresentationContainer from "../containers/PresentationContainer";
import SettingMenuContainer from "../containers/SettingMenuContainer";

export interface ILayoutProps {
    initializeState: () => any
}

export class Layout extends React.Component<ILayoutProps, {}> {
    public async componentWillMount() {
        await this.props.initializeState();
    }
    public render() {
        return <div className="container-fluid">
            <div className="row">
                <div>
                    <NavMenu />
                </div>
                <div className="col-sm-3">
                    <SettingMenuContainer />
                </div>
                <div className="col-sm-6">
                    <PresentationContainer />
                </div>
                <div className="col-sm-3">
                    <PresentationMenu />
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
};

const mapDispatchToProps = (dispatch: any) => ({
    initializeState: async () => {
        console.log("Test1");
        let action = await initializeParliamentaryElectionData();
        dispatch(action);
        console.log("Test2");
    }
});

export const layout = connect(mapStateToProps, mapDispatchToProps)((Layout) as any);