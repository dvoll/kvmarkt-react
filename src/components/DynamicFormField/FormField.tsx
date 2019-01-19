import * as React from 'react';

import './FormField.css';

export interface FormFieldProps {
    labelName: string;
    id?: string;
    name?: string;
    description?: string;

    showError?: 'touched' | boolean;
    errors?: string[];
    // htmlFor?: string;
    // id: string;
}

interface FormFieldState {
    touched: boolean;
}

class FormField extends React.PureComponent<FormFieldProps, FormFieldState> {
    public readonly state: FormFieldState = { touched: false };

    constructor(props: FormFieldProps) {
        super(props);
        this.blurHandler = this.blurHandler.bind(this);
    }

    public render() {
        const { id, name = id, labelName, children, description, errors = [], showError = true } = this.props;
        // if (children instanceof React.ComponentType<)
        const mappedChildren = React.Children.map(
            children,
            (child: React.ReactElement<React.HTMLProps<HTMLInputElement> | React.HTMLProps<HTMLSelectElement>>) => {
                const props = { id, name, onBlur: this.blurHandler, ...child.props };
                return React.cloneElement(child, props);
            }
        );
        return (
            <div className={'FormField ' + (this.shouldShowError(showError) && errors.length > 0 ? 'has-error' : '')}>
                <div className="FormField-title-line">
                    <label className="FormField-label" htmlFor={id}>
                        {labelName}
                    </label>
                    <span className="FormField-errors">{this.shouldShowError(showError) ? errors : null}</span>
                </div>
                {description && (
                    <span
                        className="Ulight-container FormField-description"
                        style={{ color: 'var(--secondary-color)' }}
                    >
                        {description}
                    </span>
                )}
                {mappedChildren}
            </div>
        );
    }

    private shouldShowError(showError: 'touched' | boolean): boolean {
        return showError === true || (showError === 'touched' && this.state.touched);
    }

    private blurHandler(event: React.FocusEvent<any>) {
        if (!this.state.touched) {
            this.setState({ touched: true });
        }
    }
}

export default FormField;
