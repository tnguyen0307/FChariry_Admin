import * as React from 'react';

import { useQuery } from '@tanstack/react-query';
import { ChevronDown } from 'akar-icons';
import { AutoComplete, AutoCompleteProps } from 'antd';
import { isNull, isUndefined } from 'lodash';
import _get from 'lodash/get';
import { useFormContext } from 'react-hook-form';

import NKFieldWrapper, { NKFieldWrapperProps } from './NKFieldWrapper';

export interface NKSelectApiOptionProps extends AutoCompleteProps {
    apiAction: (value: string, formMethods: any, isDefault: boolean, name: string) => Promise<any[]>;
    isAllOption?: boolean;
    isNoneOption?: boolean;
    readonly?: boolean;
    isSetDefault?: boolean;
    isSelectFirst?: boolean;
    notFoundContent?: React.ReactNode;
}

type Props = NKSelectApiOptionProps & NKFieldWrapperProps;

const NKSelectApiOption: React.FC<Props> = ({
    name,
    isShow = true,
    label,
    labelClassName,
    isAllOption = false,
    isNoneOption = false,
    onChangeExtra,
    readonly = false,
    isSetDefault = true,
    isSelectFirst = false,
    notFoundContent,
    ...rest
}) => {
    const firstSelectTrigger = React.useRef(false);
    const [searchValue, setSearchValue] = React.useState('');
    const [isDefault, setIsDefault] = React.useState(false);
    const formMethods = useFormContext();
    const optionsQuery = useQuery({
        queryKey: ['options', name, searchValue, isDefault],
        queryFn: async () => {
            const res = await (rest.apiAction ? rest.apiAction(searchValue, formMethods, isDefault, name) : Promise.resolve([]));

            return isAllOption
                ? [
                      {
                          id: '',
                          label: 'All',
                          name: 'all',
                      },
                      ...res,
                  ]
                : isNoneOption
                  ? [
                        {
                            id: null,
                            label: 'None',
                            name: 'None',
                        },
                        ...res,
                    ]
                  : res;
        },
        initialData: [],
    });

    React.useEffect(() => {
        if (optionsQuery.data.length === 0 || isDefault || !isSetDefault) return;
        const defaultValues = formMethods.getValues(name);

        if (isNull(defaultValues) || isUndefined(defaultValues)) {
            setSearchValue(_get(optionsQuery.data, '0.label.vi', ''));
            formMethods.setValue(name, String(optionsQuery.data[0].id));
        } else {
            const res = optionsQuery.data.find((item) => String(item.id) === String(defaultValues));

            setSearchValue(_get(res, 'label.vi', res?.name || ''));
        }
        setIsDefault(true);
    }, [optionsQuery.data, isDefault, isSetDefault]);

    const onSelect = (data: string) => {
        const res = optionsQuery.data.find((item) => String(item.id) === String(data));
        setSearchValue(_get(res, 'label.vi', res?.name || ''));
        formMethods.setValue(`${name}`, String(data), { shouldTouch: true });
    };

    React.useEffect(() => {
        if (isSelectFirst && !firstSelectTrigger.current && optionsQuery?.data?.length > 0) {
            const res = optionsQuery.data[0];

            if (res) {
                onSelect(String(res.id));
            }

            firstSelectTrigger.current = true;
        }
    }, [isSelectFirst, optionsQuery.data, onSelect]);

    const onChange = (data: string) => {
        setSearchValue(data);
    };

    return (
        <NKFieldWrapper labelClassName={labelClassName} isShow={isShow} label={label} name={name} onChangeExtra={onChangeExtra}>
            <div className="relative">
                <AutoComplete
                    value={String(searchValue)}
                    options={
                        readonly
                            ? []
                            : optionsQuery.data.map((item) => ({
                                  label: _get(item, 'label.vi', item.name),
                                  value: String(item.id),
                              }))
                    }
                    onSelect={onSelect}
                    onChange={onChange}
                    onBlur={() => {
                        const res = optionsQuery.data.find((item) => item.name === searchValue);

                        if (res) {
                            setSearchValue(res.name);
                        } else {
                            setSearchValue('');
                            setIsDefault(false);
                        }
                    }}
                    notFoundContent={notFoundContent}
                    className="relative w-full"
                    {...rest}
                />
                <div className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-tango-500">
                    <ChevronDown size={16} />
                </div>
            </div>
        </NKFieldWrapper>
    );
};

export default NKSelectApiOption;
