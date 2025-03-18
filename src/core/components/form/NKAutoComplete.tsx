import * as React from 'react';

import { AutoComplete, AutoCompleteProps } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';

import NKFieldWrapper, { NKFieldWrapperProps } from './NKFieldWrapper';

export interface NKAutoCompleteProps extends AutoCompleteProps {}

type Props = NKAutoCompleteProps & NKFieldWrapperProps;

const NKAutoComplete: React.FC<Props> = ({ name, isShow = true, label, labelClassName, options, ...rest }) => {
    const formMethods = useFormContext();
    return (
        <NKFieldWrapper labelClassName={labelClassName} isShow={isShow} label={label} name={name}>
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
        </NKFieldWrapper>
    );
};

export default NKAutoComplete;
