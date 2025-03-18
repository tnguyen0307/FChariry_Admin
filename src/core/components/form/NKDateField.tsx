import * as React from 'react';

import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { isDate } from 'lodash';
import moment from 'moment';
import { Controller, useFormContext } from 'react-hook-form';

import NKFieldWrapper, { NKFieldWrapperProps } from './NKFieldWrapper';

export type NKDateFieldTheme = 'DEFAULT' | 'AUTH';

interface NKDateFieldProps {
    theme?: NKDateFieldTheme;
    icon?: React.ReactNode;
}

type Props = NKDateFieldProps & NKFieldWrapperProps & React.ComponentProps<typeof DatePicker>;

const NKDateField: React.FC<Props> = ({ name, isShow = true, label, labelClassName, theme = 'DEFAULT', icon, ...rest }) => {
    const formMethods = useFormContext();

    return (
        <NKFieldWrapper labelClassName={labelClassName} isShow={isShow} label={label} name={name}>
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
        </NKFieldWrapper>
    );
};

export default NKDateField;
