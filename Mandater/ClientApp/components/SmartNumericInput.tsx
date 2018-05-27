import * as React from "react";

export interface SmartNumericInputProps {
    name: string,
    title: string,
    onChange: (stringValue: string, numericValue: number) => any,
    value: string,
    default: number,
    min: number,
    max: number,
    integer?: boolean,
    slider?: boolean
}

export class SmartNumericInput extends React.Component<SmartNumericInputProps, {}> {

    render() {
        let value = this.validateInput(this.props.value);
        return (
            <div className="form-group row">
                <label htmlFor={this.props.name} className="col-sm-5 col-form-label">{this.props.title}</label>
                <div className="col-sm-7">
                    <input
                        className="form-control"
                        classID={this.props.name}
                        type="number"
                        style={this.props.slider ? { width: "33%" } : {}}
                        name={this.props.name}
                        onChange=
                        {
                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                const input = this.validateInput(event.target.value);
                                this.props.onChange(input.stringValue, input.numericValue);
                            }
                        }
                        placeholder={value.numericValue.toString()}
                        value={value.stringValue}
                        min={this.props.min}
                        step={this.props.integer ? 1 : 0.1}
                        max={this.props.max}
                    />
                    {this.props.slider &&
                        <input
                        className="form-control"
                        classID={this.props.name + "Slider"}
                        type="range"
                        onChange=
                        {
                            (event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = this.props.integer ? parseInt(event.target.value) : parseFloat(event.target.value);
                                this.props.onChange(event.target.value, value);
                            }
                        }
                        value={value.numericValue}
                        min={this.props.min}
                        step={this.props.integer ? 1 : 0.1}
                        max={this.props.max}
                        />
                    }
                </div>
            </div>)
    }

    validateInput(input: string): { stringValue: string, numericValue: number } {
        const regex = RegExp("(^-$)|(^-?\\d+(\\.\\d*)?$)");
        const defaultValue = this.props.default;
        let value = 0;

        if (regex.test(input) === false && input !== "") { // Matches any numbers as well as "", "-" and "3."
            return this.validateInput(this.props.value);
        }

        if (input.indexOf("-") === 0 && this.props.min >= 0) {
            return this.validateInput(this.props.value);
        }

        if (input === "" || input === "-") {
            return { stringValue: input, numericValue: defaultValue };
        }

        if (input.indexOf(".") !== -1) {
            if (this.props.integer) {
                return this.validateInput(this.props.value);
            } else {
                if (input.indexOf(".") === input.length - 1) {
                    let prefix = input.substring(0, input.indexOf("."));
                    value = parseInt(prefix);
                } else {
                    value = parseFloat(input);
                }
            }
        } else {
            value = parseInt(input);
        }

        if (value >= this.props.min && value <= this.props.max) {
            return { stringValue: input, numericValue: value };
        } else {
            return this.validateInput(this.props.value);
        }
    }
}