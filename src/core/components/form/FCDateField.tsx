import * as React from 'react';

import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { isDate } from 'lodash';
import moment from 'moment';
import { Controller, useFormContext } from 'react-hook-form';

import FCFieldWrapper, { FCFieldWrapperProps } from './FCFieldWrapper';

export type FCDateFieldTheme = 'DEFAULT' | 'AUTH';

interface FCDateFieldProps {
    theme?: FCDateFieldTheme;
    icon?: React.ReactNode;
}

type Props = FCDateFieldProps & FCFieldWrapperProps & React.ComponentProps<typeof DatePicker>;

const FCDateField: React.FC<Props> = ({ name, isShow = true, label, labelClassName, theme = 'DEFAULT', icon, ...rest }) => {
    const formMethods = useFormContext();

    return (
        <FCFieldWrapper labelClassName={labelClassName} isShow={isShow} label={label} name={name}>
            <Controller
                name={name}
                control={formMethods.control}
                render={({ field }) => (
                    <DatePicker
                        format="DD/MM/YYYY"
                        value={dayjs(field.value)}
                        onChange={(date, dateString) => {
                            if (dateString === '' || isDate(dateString)) {
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
        </FCFieldWrapper>
    );
};

export default FCDateField;
