import {ButtonProps, Button} from "../components/Button"
import { TableMode } from "../states/TableState";
import * as React from "react";

export interface TableButtonProps extends ButtonProps {
    tableMode : TableMode
}

export class TableButton extends Button<TableButtonProps> {
    constructor(props: any) {
        super(props);
    }
    render() {
        return <button
                title={this.props.accessibilityLabel}
                onClick={this.props.onPress}>
                {this.props.title}
               </button>;
    }
}