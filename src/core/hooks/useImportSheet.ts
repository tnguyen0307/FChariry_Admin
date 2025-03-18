import { useRef, useState } from 'react';

import { message } from 'antd';
import { uniqBy } from 'lodash';

import { importSheet } from '../utils/sheet.helper';

export const useImportSheet = <
    T extends Record<string, unknown> = Record<string, unknown>,
    S extends Record<string, unknown> = Record<string, unknown>,
>(
    format: (data: S[]) => T[],
    uniqueKey?: keyof S,
    validate?: (data: S) => boolean,
) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<T[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleImportSheet = async (files: File[]) => {
        try {
            setIsLoading(true);

            const data = await Promise.all(
                files.map(async (file) => {
                    let rows = await importSheet<S>(file, validate);

                    if (uniqueKey) {
                        rows = uniqBy(rows, uniqueKey);
                    }

                    return rows.map((row) => ({ ...row, file })) as S[];
                }),
            );

            setData(format(data.flat()));

            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);

            message.error(error instanceof Error ? error.message : 'Đã có lỗi xảy ra, vui lòng thử lại');
        }

        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return {
        isLoading,
        data,
        inputRef,
        handleImportSheet,
        setData,
    };
};
