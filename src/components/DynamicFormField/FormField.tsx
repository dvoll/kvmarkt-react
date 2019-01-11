import * as React from 'react';

export interface FormFieldProps {
    labelName: string;
    id?: string;
    description?: string;
    // htmlFor?: string;
    // id: string;
}

const FormField: React.SFC<FormFieldProps> = ({ id, labelName, children, description, ...restProps }) => {
    // if (children instanceof React.ComponentType<)
    const mappedChildren = React.Children.map(
        children,
        (child: React.ReactElement<React.HTMLProps<HTMLInputElement> | React.HTMLProps<HTMLSelectElement>>) => {
            const props = { id, ...child.props };
            return React.cloneElement(child, props);
        }
    );
    return (
        <div style={{ margin: '40px 0 40px 0' }}>
            <label
                htmlFor={id}
                style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block', fontSize: '0.8rem' }}
            >
                {labelName}
            </label>
            {description && (
                <span className="Ulight-container" style={{ color: 'var(--secondary-color)' }}>
                    {description}
                </span>
            )}
            {mappedChildren}
        </div>
    );
};

export default FormField;
