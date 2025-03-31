import * as React from 'react';

import { AutoComplete, AutoCompleteProps } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';

import FCFieldWrapper, { FCFieldWrapperProps } from './FCFieldWrapper';

export interface FCAutoCompleteProps extends AutoCompleteProps {}

type Props = FCAutoCompleteProps & FCFieldWrapperProps;

const FCAutoComplete: React.FC<Props> = ({ name, isShow = true, label, labelClassName, options, ...rest }) => {
    const formMethods = useFormContext();
    return (
        <FCFieldWrapper labelClassName={labelClassName} isShow={isShow} label={label} name={name}>
            <Controller
                name={name}
                control={formMethods.control}
                render={({ field }) => {
                    return (
                        <AutoComplete
                            options={options}
                            value={field.value}
                            onChange={field.onChange}
                            onSelect={field.onChange}
                            onBlur={field.onBlur}
                            className="w-full"
                            {...rest}
                        />
                    );
                }}
            />
        </FCFieldWrapper>
    );
};

export default FCAutoComplete;
