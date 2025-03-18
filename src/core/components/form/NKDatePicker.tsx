import * as React from 'react';

import { DatePicker, DatePickerProps } from 'antd';

import dayjs from 'dayjs';
import { isDate } from 'lodash';
import moment from 'moment';
import { Controller, useFormContext } from 'react-hook-form';

import NKFieldWrapper, { NKFieldWrapperProps } from './NKFieldWrapper';

export interface NKDatePickerProps {
    canClear?: boolean;
}

type Props = NKDatePickerProps & NKFieldWrapperProps & DatePickerProps;

const NKDatePicker: React.FC<Props> = ({ name, isShow = true, label, labelClassName, canClear, ...rest }) => {
    const formMethods = useFormContext();

    return (
        <NKFieldWrapper labelClassName={labelClassName} isShow={isShow} label={label} name={name}>
            <div>
                <Controller
                    name={name}
                    control={formMethods.control}
                    render={({ field }) => (
                        <DatePicker
                            format="DD/MM/YYYY"
                            value={field.value ? dayjs(field.value) : null}
                            onChange={(date, dateString) => {
                                if (canClear && dateString === '') {
                                    field.onChange(null);
                                } else if (dateString === '' || isDate(dateString)) {
                                    field.onChange(new Date().toISOString());
                                } else {
                                    field.onChange(moment(dateString, 'DD/MM/YYYY').toDate().toISOString());
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

export default NKDatePicker;
