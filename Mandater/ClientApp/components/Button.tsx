import * as React from "react";

export interface ButtonProps {
    title: string,
    onPress: () => any,
    accessibilityLabel?: string,
}

export class Button<P> extends React.Component<P & ButtonProps, {}> {
    render() {
        return <button
                   title={this.props.accessibilityLabel}
                   onClick={this.props.onPress}>d
                   {this.props.title}
               </button>;
    }
}

