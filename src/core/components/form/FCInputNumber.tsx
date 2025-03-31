import * as React from 'react';

import { InputNumber, InputNumberProps } from 'antd';
import _ from 'lodash';
import { Controller, useFormContext } from 'react-hook-form';

import FCFieldWrapper, { FCFieldWrapperProps } from './FCFieldWrapper';

export interface FCInputNumberProps extends InputNumberProps {}

type Props = FCInputNumberProps & FCFieldWrapperProps;

const FCInputNumber: React.FC<Props> = ({ name, isShow, label, labelClassName, ...rest }) => {
    const formMethods = useFormContext();

    return (
        <FCFieldWrapper labelClassName={labelClassName} isShow={isShow} label={label} name={name}>
            <Controller
                name={name}
                control={formMethods.control}
                render={({ field }) => (
                    <InputNumber
                        {...field}
                        {...rest}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                        className="w-full"
                    />
                )}
            />
        </FCFieldWrapper>
    );
};

export default FCInputNumber;
