import * as React from 'react';

import { Input, InputProps } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';

import FCFieldWrapper, { FCFieldWrapperProps } from './FCFieldWrapper';

export interface FCTextFieldProps extends InputProps {}

type Props = FCTextFieldProps & FCFieldWrapperProps;

const FCTextField: React.FC<Props> = ({ name, isShow, label, labelClassName, ...rest }) => {
    const formMethods = useFormContext();

    return (
        <FCFieldWrapper labelClassName={labelClassName} isShow={isShow} label={label} name={name} {...rest}>
            <Controller name={name} control={formMethods.control} render={({ field }) => <Input {...field} {...rest} className="w-full" />} />
        </FCFieldWrapper>
    );
};

export default FCTextField;
