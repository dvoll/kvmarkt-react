import { BaseFormLabel, BaseInput } from '@dvll/ulight-react';
import * as React from 'react';

export enum DynamicFormInputTypes {
    TEXT = 'text',
    TEXTAREA = 'textarea',
    NUMBER = 'number',
    PASSWORD = 'password',
    SELECT = 'select',
    BUTTON = 'button',
    SUBMIT = 'submit',
}

export interface DynamicFormFieldProps {
    type: DynamicFormInputTypes;
    // value?: string;
    items?: Array<{ value: string | number; name: string }>;
    // props: React.DetailedHTMLProps<
    //         React.InputHTMLAttributes<HTMLInputElement>
    //         | React.SelectHTMLAttributes<HTMLSelectElement>
    //         | React.TextareaHTMLAttributes<HTMLTextAreaElement>
    //     , HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement >;
    labelname: string;
}

export type DynFormTypes = DynamicFormFieldProps &
    React.DetailedHTMLProps<
        | React.InputHTMLAttributes<HTMLInputElement>
        | React.SelectHTMLAttributes<HTMLSelectElement>
        | React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        // | React.ButtonHTMLAttributes < HTMLButtonElement >
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >;

const DynamicFormField: React.SFC<DynFormTypes> = props => {
    let element = null;

    switch (props.type) {
        case DynamicFormInputTypes.SELECT:
            const items =
                props.items &&
                props.items.map(item => (
                    <option key={item.value} value={item.value}>
                        {item.name}
                    </option>
                ));
            element = (
                <select
                    {...props as React.DetailedHTMLProps<
                        React.SelectHTMLAttributes<HTMLSelectElement>,
                        HTMLSelectElement
                    >}
                >
                    {items}
                </select>
            );
            break;
        case DynamicFormInputTypes.TEXT:
        case DynamicFormInputTypes.NUMBER:
        case DynamicFormInputTypes.PASSWORD:
        case DynamicFormInputTypes.BUTTON:
        case DynamicFormInputTypes.SUBMIT:
            element = (
                <BaseInput
                    key={'DynamicFormFiled' + props.id}
                    {...props as React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>}
                    type={props.type}
                />
            );
            break;
        case DynamicFormInputTypes.TEXTAREA:
            element = (
                <textarea
                    {...props as React.DetailedHTMLProps<
                        React.InputHTMLAttributes<HTMLTextAreaElement>,
                        HTMLTextAreaElement
                    >}
                />
            );
            break;
        default:
            element = <span>Fehler beim Erstellen des Eingabefeldes.</span>;
    }

    return (
        <React.Fragment>
            <BaseFormLabel>{props.labelname}</BaseFormLabel>
            {element}
        </React.Fragment>
    );
};

export default DynamicFormField;
