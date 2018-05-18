import * as React from "react";

type ButtonProps = {
    title: string,
    onPress: () => any,
    accessibilityLabel?: string,
}

const Button = (props: ButtonProps) => {
    return <button
               onClick={props.onPress}>
               {props.title}
           </button>;
};

export default Button;