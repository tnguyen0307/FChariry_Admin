import * as React from 'react';

import { FormProvider, UseFormReturn } from 'react-hook-form';

interface NKFormFieldProps extends React.FormHTMLAttributes<HTMLFormElement> {
    methods: UseFormReturn<any, any, any>;
}

const NKFormField: React.FunctionComponent<NKFormFieldProps> = ({ methods, ...rest }) => {
    return (
        <FormProvider {...methods}>
            <form {...rest} />
        </FormProvider>
    );
};

export default NKFormField;
