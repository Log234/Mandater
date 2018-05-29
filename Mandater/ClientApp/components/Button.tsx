import * as React from "react";

export interface ButtonProps {
    title: string,
    onPress: () => any,
    accessibilityLabel?: string,
    type?: string,
    style?: React.CSSProperties;
}

export class Button<P> extends React.Component<P & ButtonProps, {}> {
    render() {
        return <button
                    title={this.props.accessibilityLabel}
                    onClick={this.props.onPress}
                    type={this.props.type}
                    style={this.props.style}
                    >
                    {this.props.title}
               </button>;
    }
}

