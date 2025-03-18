import * as React from 'react';

import _ from 'lodash';
import { useFormContext } from 'react-hook-form';

export interface NKFieldWrapperProps {
    label: string;
    name: string;
    isShow?: boolean;
    labelClassName?: string;
    onChangeExtra?: (value: any, path: string, formMethods: any) => void;
}

const NKFieldWrapper: React.FC<NKFieldWrapperProps & React.PropsWithChildren> = ({
    children,
    isShow = true,
    label,
    labelClassName,
    name,
    onChangeExtra,
}) => {
    const formMethods = useFormContext();
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const value = formMethods.watch(name);

    React.useEffect(() => {
        const error = _.get(formMethods.formState.errors, `${name}.message`, '') as string;
        if (!error) {
            setErrorMessage('');
            return;
        }

        setErrorMessage(error);
    }, [formMethods.formState.errors]);

    React.useEffect(() => {
        onChangeExtra?.(value, name, formMethods);
    }, [value, onChangeExtra]);

    return (
        <div className="flex w-full flex-col gap-1">
            {isShow && <label className={labelClassName ? labelClassName : 'text-sm text-black'}>{label}</label>}
            {children}
            {Boolean(errorMessage) && (
                <div className="text-sm text-red-500">
                    {label} {errorMessage}
                </div>
            )}
        </div>
    );
};

export default NKFieldWrapper;
