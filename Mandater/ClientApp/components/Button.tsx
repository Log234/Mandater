import * as React from "react";

export interface ButtonProps {
    title: string,
    onPress: (event: React.MouseEvent<HTMLButtonElement>) => any,
    accessibilityLabel?: string,
    type?: string;
}

export class Button<P> extends React.Component<P & ButtonProps, {}> {
    render() {
        return <button
                    title={this.props.accessibilityLabel}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                this.props.onPress(event);
                            }
                        }
                    type={this.props.type}
                    >
                    {this.props.title}
               </button>;
    }
}

