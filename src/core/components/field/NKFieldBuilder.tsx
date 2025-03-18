import * as React from 'react';

import { Descriptions } from 'antd';
import clsx from 'clsx';
import _get from 'lodash/get';

import { cn } from '@/core/utils/tailwind';

import FieldDisplay, { FieldType } from './NKFieldDisplay';

interface FieldBuilderItem {
    name: string;
    title: string;
    type: FieldType;
    span?: 1 | 2 | 3 | 4 | 5 | 6;
    apiAction?: (value?: any) => any;
    formatter?: (value: any) => any;
}

interface FieldBuilderProps<T> {
    title: string;
    fields: FieldBuilderItem[];
    record: T | undefined;
    extra?: React.ReactNode;
    isFetching?: boolean;
    containerClassName?: string;
}

const FieldBuilder = <T,>({ fields, title, record, extra, isFetching, containerClassName }: FieldBuilderProps<T>) => {
    return (
        <div className={cn('fade-in flex flex-col gap-4  rounded-lg    bg-white px-8 py-8', containerClassName)}>
            {isFetching ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div className="sr-only col-span-1"></div>
                    <div className="sr-only col-span-2"></div>
                    <div className="sr-only col-span-3"></div>
                    <div className="sr-only col-span-4"></div>
                    <div className="flex items-end  gap-4">
                        {Boolean(title) && <div className="text-xl font-bold text-black">{title}</div>}
                        {extra}
                    </div>

                    <Descriptions
                        bordered
                        className="rounded-lg bg-white"
                        size="middle"
                        column={{
                            lg: 6,
                            md: 6,
                            sm: 6,
                            xl: 6,
                            xs: 6,
                        }}
                    >
                        {fields.map((item) => {
                            const value = Boolean(item.name) ? _get(record, item.name) : record;

                            return (
                                <Descriptions.Item key={item.name} label={item.title} span={item.span || 3}>
                                    <FieldDisplay type={item.type} value={value} apiAction={item.apiAction} formatter={item.formatter} />
                                </Descriptions.Item>
                            );
                        })}
                    </Descriptions>
                </>
            )}
        </div>
    );
};

export default FieldBuilder;
