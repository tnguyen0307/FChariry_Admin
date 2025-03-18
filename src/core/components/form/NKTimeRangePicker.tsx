import * as React from 'react';

import { DatePicker, TimePicker } from 'antd';
import { TimeRangePickerProps } from 'antd/es/time-picker';
import dayjs, { Dayjs } from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

import NKFieldWrapper, { NKFieldWrapperProps } from './NKFieldWrapper';

export interface NKTimeRangeProps {}

type Props = NKTimeRangeProps & NKFieldWrapperProps & TimeRangePickerProps;

const NKTimeRangePicker: React.FC<Props> = ({ name, isShow = true, label, labelClassName, ...rest }) => {
    const formMethods = useFormContext();

    return (
        <NKFieldWrapper labelClassName={labelClassName} isShow={isShow} label={label} name={name}>
            <div>
                <Controller
                    name={name}
                    control={formMethods.control}
                    render={({ field }) => {
                        return (
                            <TimePicker.RangePicker
                                className="w-full"
                                onChange={(values) => {
                                    const [start, end] = values || [null, null];
                                    if (start && end) {
                                        field.onChange([start.toISOString(), end.toISOString()]);
                                    } else {
                                        field.onChange([
                                            new Date(dayjs().toISOString()).toISOString(),
                                            new Date(dayjs().add(1, 'hour').toISOString()).toISOString(),
                                        ]);
                                    }
                                }}
                                value={field.value ? [dayjs(field.value[0] as string) as Dayjs, dayjs(field.value[1] as string) as Dayjs] : undefined}
                                {...rest}
                            />
                        );
                    }}
                />
            </div>
        </NKFieldWrapper>
    );
};

export default NKTimeRangePicker;
