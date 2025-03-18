import * as React from 'react';

import { DatePicker } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

import NKFieldWrapper, { NKFieldWrapperProps } from './NKFieldWrapper';

export interface NKDateRangeProps {}

type Props = NKDateRangeProps & NKFieldWrapperProps & RangePickerProps;

const NKDateRangePicker: React.FC<Props> = ({ name, isShow = true, label, labelClassName, ...rest }) => {
    const formMethods = useFormContext();

    return (
        <NKFieldWrapper labelClassName={labelClassName} isShow={isShow} label={label} name={name}>
            <div>
                <Controller
                    name={name}
                    control={formMethods.control}
                    render={({ field }) => (
                        <DatePicker.RangePicker
                            className="w-full"
                            onChange={(values) => {
                                const [start, end] = values || [null, null];
                                if (start && end) {
                                    field.onChange([start.toISOString(), end.toISOString()]);
                                } else {
                                    field.onChange([
                                        new Date(dayjs().toISOString()).toISOString(),
                                        new Date(dayjs().add(1, 'day').toISOString()).toISOString(),
                                    ]);
                                }
                            }}
                            value={[field.value ? dayjs(field.value[0]) : null, field.value ? dayjs(field.value[1]) : null]}
                            {...rest}
                        />
                    )}
                />
            </div>
        </NKFieldWrapper>
    );
};

export default NKDateRangePicker;
