import * as React from "react";
import { NavMenu } from "../components/NavMenu";
import SettingMenuContainer from "../containers/SettingMenuContainer";
import PresentationContainer from "../containers/PresentationContainer";
import { PresentationMenu } from "../components/PresentationMenu";

interface IProps {
    initializeState: () => any,
    initializePresentationState: () => any;
}

export class LayoutComponent extends React.Component<IProps, {}> {
    async componentWillMount() {
        await this.props.initializeState();
    }

    public render() {
        return <div className="container-fluid">
                   <NavMenu/>
                   <div className="row">
                       <div className="col-md-3">
                           <SettingMenuContainer/>
                       </div>
                       <div className="col-md-6">
                           <PresentationContainer/>
                       </div>
                       <div className="col-md-3">
                           <PresentationMenu/>
                       </div>
                   </div>
               </div>;
    }
}