import * as React from 'react';



import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import { Button, ButtonProps } from 'antd';
import clsx from 'clsx';
import joi from 'joi';
import { kebabCase } from 'lodash';
import { useForm } from 'react-hook-form';



import { cn } from '@/core/utils/tailwind';



import NKForm, { FieldProps, NKFormType } from './NKForm';
import NKFormWrapper from './NKFormWrapper';


export interface FormBuilderItem {
    name: string;
    label: string;
    type: NKFormType;
    span?: 1 | 2 | 3 | 4;
    isShow?: (value: any) => boolean;
    apiAction?: (value: any) => any;
}

export type BuilderItem = FormBuilderItem & FieldProps;

interface FormBuilderProps<T> {
    title?: string;
    apiAction: (value: T) => any;
    fields: BuilderItem[];
    defaultValues: T;
    schema: Record<keyof T, joi.AnySchema>;
    btnLabel?: string;
    onExtraSuccessAction?: (data: any) => void;
    onExtraErrorAction?: (error: any) => void;
    beforeSubmit?: (value: T) => boolean;
    isDebug?: boolean;
    className?: string;
    buttonProps?: Omit<ButtonProps, 'loading' | 'children'>;
    resetOnSuccess?: boolean;
    onFormChange?: (value: any, formMethods: ReturnType<typeof useForm>) => void;
}

const FormBuilder = <T,>({
    fields,
    title,
    apiAction,
    schema,
    defaultValues,
    onExtraSuccessAction,
    onExtraErrorAction,
    btnLabel = 'Submit',
    isDebug,
    className,
    beforeSubmit,
    buttonProps,
    resetOnSuccess = true,
    onFormChange,
}: FormBuilderProps<T>) => {
    const formMethods = useForm<any>({
        defaultValues,
        resolver: joiResolver(joi.object(schema)),
    });
    const watchValues = formMethods.watch();

    const mutate = useMutation({
        mutationFn: apiAction,
        onSuccess: (data) => {
            onExtraSuccessAction?.(data);

            if (resetOnSuccess) {
                formMethods.reset({
                    ...defaultValues,
                });
            }
        },
        onError: (error) => {
            onExtraErrorAction?.(error);
        },
    });

    React.useEffect(() => {
        if (isDebug) {
            console.log('FormBuilder', formMethods.getValues());
            console.log('FormBuilder', formMethods.formState.errors);
        }
    }, [formMethods.getValues()]);

    React.useEffect(() => {
        if (onFormChange) {
            onFormChange(watchValues, formMethods);
        }
    }, [watchValues]);

    return (
        <form
            className={cn('fade-in flex flex-col gap-4 rounded-lg bg-white p-4', className)}
            onSubmit={formMethods.handleSubmit((value) => {
                if (beforeSubmit && !beforeSubmit(value)) {
                    return;
                }

                mutate.mutate(value);
            })}
        >
            {Boolean(title) && (
                <div className="text-xl font-bold">
                    {title}
                    <div className="sr-only col-span-1"></div>
                    <div className="sr-only col-span-2"></div>
                    <div className="sr-only col-span-3"></div>
                    <div className="sr-only col-span-4"></div>
                </div>
            )}
            <NKFormWrapper formMethods={formMethods} formActionError={mutate.error}>
                <div className="grid grid-cols-4 gap-4">
                    {fields
                        .filter((item) => (item.isShow ? item.isShow(watchValues) : true))
                        .map((item) => {
                            return (
                                <div key={kebabCase(`${item.name}-${item.label}`)} className={`col-span-${item?.span || 4} `}>
                                    <NKForm {...item} label={item.label} name={item.name} type={item.type} fieldProps={item.fieldProps as any} />
                                </div>
                            );
                        })}
                </div>
            </NKFormWrapper>
            <Button type="primary" htmlType="submit" loading={mutate.isPending} {...buttonProps}>
                {btnLabel}
            </Button>
        </form>
    );
};

export default FormBuilder;