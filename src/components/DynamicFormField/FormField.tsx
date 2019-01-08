import * as React from 'react';

export interface FormFieldProps {
    labelName: string;
    id?: string;
    // htmlFor?: string;
    // id: string;
}

const FormField: React.SFC<FormFieldProps> = ({ id, labelName, children, ...restProps }) => {
    const mappedChildren = React.Children.map(
        children,
        (child: React.ReactElement<React.HTMLProps<HTMLInputElement> | React.HTMLProps<HTMLSelectElement>>) => {
            const props = { id, ...child.props };
            return React.cloneElement(child, props);
        }
    );
    return (
        <div style={{ margin: '10px 0 10px 0' }}>
            <label htmlFor={id}>{labelName}</label>
            <br />
            {mappedChildren}
        </div>
    );
};

export default FormField;
