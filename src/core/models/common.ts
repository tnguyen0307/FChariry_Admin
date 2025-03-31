import { TableProps } from 'antd';

export interface IPagingDto {
    page: number;
    pageSize: number;
    orderBy: string[];
    filters: string[];
}

export interface NKI18n {
    vi: string;
    en: string;
}

export interface IReportDto {
    valuePath: string;
    filters: string[];
}

export interface ReportResponse {
    value: any;
    time: string;
}

export interface ResponseList<T> {
    count: number;
    data: T[];
    totalPage: number;
}

export enum SortOrder {
    ASC = 'ASC',
    DESC = 'DESC',
}

export enum FilterComparator {
    EQUAL = '=',
    NOT_EQUAL = '!=',
    LESS_THAN = '<',
    LESS_THAN_OR_EQUAL = '<=',
    GREATER_THAN = '>',
    GREATER_THAN_OR_EQUAL = '>=',
    IN = 'IN',
    NOT_IN = 'NOT IN',
    LIKE = 'LIKE',
    BETWEEN = 'BETWEEN',
    IS_NULL = 'IS NULL',
    IS_NOT_NULL = 'IS NOT NULL',
}

export interface EnumListItem {
    id: any;
    label: string;
    color: string;
    slug: string;
    name: string;
    value: any;
}

export type OnChange<T = unknown> = NonNullable<TableProps<T>['onChange']>;

export type GetSingle<T> = T extends (infer U)[] ? U : never;
export type Sorts = GetSingle<Parameters<OnChange>[2]>;
