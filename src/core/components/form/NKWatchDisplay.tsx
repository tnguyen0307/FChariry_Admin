import * as React from 'react';

import { FieldValues, UseFormReturn, useFormContext } from 'react-hook-form';

import NKFieldWrapper, { NKFieldWrapperProps } from './NKFieldWrapper';

export interface NKWatchDisplayProps extends React.HTMLAttributes<HTMLInputElement> {
    apiAction?: (value: any, formMethods?: UseFormReturn<FieldValues, any, undefined>) => React.ReactNode;
}

type Props = NKWatchDisplayProps & NKFieldWrapperProps;

const NKWatchDisplay: React.FC<Props> = ({ name, isShow, label, labelClassName, apiAction, ...rest }) => {
    const formMethods = useFormContext();
    const watchValue = formMethods.watch(name);

    return (
        <NKFieldWrapper labelClassName={labelClassName} isShow={isShow} label={label} name={name}>
            {apiAction ? apiAction(watchValue, formMethods) : <div {...rest}>{watchValue}</div>}
        </NKFieldWrapper>
    );
};

export default NKWatchDisplay;
