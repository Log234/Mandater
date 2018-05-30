import * as React from "react";

export interface ButtonProps {
    title: string,
    onPress?: () => any,
    accessibilityLabel?: string,
    className?: string,
    type?: string;
}

export class Button<P> extends React.Component<P & ButtonProps, {}> {
    render() {
        return <button
                    title={this.props.accessibilityLabel}
                    onClick={this.props.onPress}
                    type={this.props.type}
                    className={this.props.className}
                    >
                    {this.props.title}
               </button>;
    }
}

