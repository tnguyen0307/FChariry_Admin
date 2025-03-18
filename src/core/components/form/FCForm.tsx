import * as React from 'react';

import { FCFieldWrapperProps } from './FCFieldWrapper';
import FCInputNumber, { FCInputNumberProps } from './FCInputNumber';
import FCTextField, { FCTextFieldProps } from './FCTextField';
export enum FCFormType {
    TEXT = 'text',
    PASSWORD = 'password',
    NUMBER = 'number',
    CUSTOM = 'custom',
}

export type FieldProps = FCFieldWrapperProps &
    (
        | FCFieldsProps<FCFormType.TEXT, FCTextFieldProps>
        | FCFieldsProps<FCFormType.PASSWORD, FCTextFieldProps>
        | FCFieldsProps<FCFormType.NUMBER, FCInputNumberProps>
        | FCFieldsProps<FCFormType.CUSTOM, any>
    );

interface FCFieldsProps<Type, IField> {
    type: Type;
    fieldProps?: IField;
}

const FCForm: React.FC<FieldProps> = ({ label, name, type, fieldProps, ...rest }) => {
    switch (type) {
        case FCFormType.TEXT:
            return <FCTextField name={name} label={label} {...fieldProps} {...rest} />;
        case FCFormType.PASSWORD:
            return <FCTextField name={name} label={label} type={'password'} {...fieldProps} {...rest} />;
        case FCFormType.NUMBER:
            return <FCInputNumber name={name} label={label} {...fieldProps} {...rest} />;
        case FCFormType.CUSTOM:
            return fieldProps.apiAction ? fieldProps.apiAction() : null;
        default:
            return <FCTextField name={name} label={label} {...(fieldProps as any)} {...rest} />;
    }
};

export default FCForm;
