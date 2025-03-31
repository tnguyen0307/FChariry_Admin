import * as React from 'react';

import { FormProvider, UseFormReturn } from 'react-hook-form';

interface FCFormFieldProps extends React.FormHTMLAttributes<HTMLFormElement> {
    methods: UseFormReturn<any, any, any>;
}

const FCFormField: React.FunctionComponent<FCFormFieldProps> = ({ methods, ...rest }) => {
    return (
        <FormProvider {...methods}>
            <form {...rest} />
        </FormProvider>
    );
};

export default FCFormField;
