import * as React from 'react';

import { TimePicker, TimePickerProps } from 'antd';
import dayjs from 'dayjs';
import { isDate } from 'lodash';
import moment from 'moment';
import { Controller, useFormContext } from 'react-hook-form';

import NKFieldWrapper, { NKFieldWrapperProps } from './NKFieldWrapper';

export interface NKTimePickerProps {
    canClear?: boolean;
}

type Props = NKTimePickerProps & NKFieldWrapperProps & TimePickerProps;

const NKTimePicker: React.FC<Props> = ({ name, isShow = true, label, labelClassName, canClear, ...rest }) => {
    const formMethods = useFormContext();

    return (
        <NKFieldWrapper labelClassName={labelClassName} isShow={isShow} label={label} name={name}>
            <div>
                <Controller
                    name={name}
                    control={formMethods.control}
                    render={({ field }) => (
                        <TimePicker
                            format={rest.format || 'HH:mm'}
                            value={field.value ? dayjs(field.value, (rest.format as string) || 'HH:mm') : null}
                            onChange={(date, dateString) => {
                                if (canClear && dateString === '') {
                                    field.onChange(null);
                                } else if (dateString === '' || isDate(dateString)) {
                                    field.onChange(dayjs());
                                } else {
                                    // @ts-ignore
                                    field.onChange(dayjs(dateString, (rest.format as string) || 'HH:mm'));
                                }
                            }}
                            {...rest}
                            className="w-full"
                        />
                    )}
                />
            </div>
        </NKFieldWrapper>
    );
};

export default NKTimePicker;