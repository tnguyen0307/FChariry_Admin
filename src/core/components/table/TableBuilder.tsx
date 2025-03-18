import * as React from 'react';



import { PageHeader } from '@ant-design/pro-layout';
import { Popover } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import { Button, Table } from 'antd';
import { AnyObject } from 'antd/lib/_util/type';
import Layout, { Content } from 'antd/lib/layout/layout';
import { ColumnType } from 'antd/lib/table';
import { ExpandableConfig } from 'antd/lib/table/interface';
import clsx from 'clsx';
import { flatten } from 'flat';
import _get from 'lodash/get';
import { FormProvider, useForm } from 'react-hook-form';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';



import { FilterComparator, IPagingDto, ResponseList, SortOrder } from '@/core/models/common';
import { cn } from '@/core/utils/tailwind';



import FieldDisplay, { FieldType } from '../field/NKFieldDisplay';
import FCForm, { FCFormType } from '../form/FCForm';


export interface TableBuilderColumn extends ColumnType<AnyObject> {
    type: FieldType;
    name: string;
    apiAction?: (value: any) => any;
    formatter?: (value: any) => any;
}

export interface IFilterItem {
    name: string;
    filterName?: string;
    type: FCFormType;
    label: string;
    comparator: FilterComparator;
    defaultValue?: any;
    fieldProps?: any;
    apiAction?: (value: any) => Promise<any>;
}

export interface ITopActionItem {
    label: string;
    name: string;
    comparator: FilterComparator;
    value: any;
    color: string;
}

export interface IActionColum {
    label: string;
    onClick: (record: any) => void;
    isShow?: (record: any) => boolean;
}

interface TableBuilderProps {
    title?: string;
    extraFilter?: string[];
    defaultFilter?: Record<string, any>;
    sourceKey: string;
    apiAction: (dto: IPagingDto) => Promise<ResponseList<any>>;
    columns: TableBuilderColumn[];
    onBack?: () => void;
    topActions?: React.ReactNode;
    filters?: IFilterItem[];
    pageSizes?: number[];
    tableSize?: 'small' | 'middle' | 'large';
    actionSize?: number;
    extraButtons?: React.ReactNode;
    enableQuery?: boolean;
    extraBulkActions?: (selectRows: any[], setSelectRows: React.Dispatch<React.SetStateAction<any[]>>) => React.ReactNode;
    expandable?: ExpandableConfig<any>;
    actionColumns?: ((record: any) => React.ReactNode) | React.ReactNode;
    bottomTitleActions?: React.ReactNode;
    orderBy?: string;
    order?: SortOrder;
}

const TableBuilder: React.FC<TableBuilderProps> = ({
    sourceKey,
    title,
    apiAction,
    columns,
    extraFilter = [],
    onBack,
    pageSizes = [10],
    tableSize = 'middle',
    filters = [],
    topActions = [],
    extraBulkActions,
    extraButtons,
    actionColumns,
    actionSize = 50,
    defaultFilter = {},
    expandable,
    enableQuery = true,
    bottomTitleActions,
    orderBy: defaultOrderBy,
    order: defaultOrder = SortOrder.DESC,
}) => {
    const [topActionIndex, setTopActionIndex] = React.useState(-1);
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(pageSizes[0]);
    const [order, setOrder] = React.useState<SortOrder>(defaultOrder);
    const [orderBy, setOrderBy] = React.useState<string>(defaultOrderBy || 'createdAt');
    const [isShowFilter, setIsShowFilter] = React.useState(false);
    const [selectedRowGroup, setSelectedRowGroup] = React.useState<any[]>([]);
    const defaultValues = React.useMemo(() => {
        const defaultValues: Record<any, any> = filters.reduce((acc: any, item: any) => {
            acc[item.name] = item.defaultValue;

            return acc;
        }, {});

        return {
            ...defaultValues,
            ...defaultFilter,
        };
    }, [defaultFilter]);

    const formMethods = useForm({ defaultValues });

    React.useEffect(() => {
        if (extraFilter.length !== 0) {
            setPage(1);
        }
    }, [extraFilter]);

    const pagingQuery = useQuery({
        queryKey: [sourceKey, 'paging', page, pageSize, order, orderBy, extraFilter, formMethods.getValues()],
        queryFn: () => {
            const filterValues = flatten(formMethods.getValues()) as Record<string, any>;

            return apiAction({
                page: page - 1,
                pageSize,
                orderBy: orderBy ? [`${orderBy}||${order}`] : [`createdAt||${SortOrder.DESC}`],
                filters: [
                    ...Object.keys(filterValues)
                        .map((key) => {
                            const value = filterValues[key];
                            const filterKey = filters.find((item) => item.name === key)?.filterName || key;

                            if (value === undefined || value === null || value === '') {
                                return undefined;
                            }

                            return {
                                name: filterKey,
                                value,
                                comparator: filters.find((item) => item.name === key)?.comparator || FilterComparator.EQUAL,
                            };
                        })
                        .filter((item) => item !== undefined)
                        .map((item) => `${item?.name}||${item?.comparator}||${item?.value}`),
                    ...extraFilter,
                ],
            });
        },

        initialData: {
            count: 0,
            data: [],
            totalPage: 0,
        },
        enabled: enableQuery,
    });

    return (
        <div className="fade-in flex gap-4 ">
            <Layout>
                <Content
                    className={clsx('', {
                        'ml-4': isShowFilter,
                    })}
                >
                    <div>
                        {title && (
                            <div>
                                <PageHeader
                                    title={title}
                                    className="px-0"
                                    onBack={onBack}
                                    extra={[
                                        <div>
                                            {selectedRowGroup.length === 0 ? null : (
                                                <React.Fragment key="3">{extraBulkActions?.(selectedRowGroup, setSelectedRowGroup)}</React.Fragment>
                                            )}
                                            {extraButtons}
                                        </div>,
                                    ]}
                                />
                                {bottomTitleActions}
                            </div>
                        )}
                        <div
                            className={cn('flex items-center gap-4 px-0', {
                                'pb-4': filters.length !== 0 || extraButtons,
                            })}
                        >
                            {filters.length === 0 ? null : (
                                <Popover className="relative">
                                    <Popover.Button as="div">
                                        <Button
                                            type="primary"
                                            key="1"
                                            icon={
                                                <div className="flex h-5 items-center justify-center">
                                                    <HiMiniMagnifyingGlass />
                                                </div>
                                            }
                                        >
                                            Tìm Kiếm
                                        </Button>
                                    </Popover.Button>

                                    <Popover.Panel className="absolute left-0 top-[120%]  z-10 w-80">
                                        <FormProvider {...formMethods}>
                                            <div className="fade-in flex flex-col gap-4 rounded-md bg-white px-6 py-8 shadow-lg">
                                                {filters.map((item) => {
                                                    if (item.type === FCFormType.SELECT_API_OPTION) {
                                                        return (
                                                            <FCForm
                                                                key={item.name}
                                                                name={item.name}
                                                                label={item.label}
                                                                type={item.type}
                                                                fieldProps={{
                                                                    apiAction: item.apiAction as any,
                                                                    isAllOption: true,
                                                                }}
                                                            />
                                                        );
                                                    }

                                                    return (
                                                        <FCForm
                                                            key={item.name}
                                                            name={item.name}
                                                            label={item.label}
                                                            type={item.type as any}
                                                            fieldProps={item.fieldProps as any}
                                                        />
                                                    );
                                                })}

                                                <div className="flex gap-4">
                                                    <Button
                                                        className="w-full"
                                                        type="primary"
                                                        onClick={() => {
                                                            pagingQuery.refetch();
                                                        }}
                                                    >
                                                        Tìm
                                                    </Button>
                                                    <Button
                                                        className="w-full"
                                                        onClick={() => {
                                                            formMethods.reset();
                                                        }}
                                                    >
                                                        Xóa
                                                    </Button>
                                                </div>
                                            </div>
                                        </FormProvider>
                                    </Popover.Panel>
                                </Popover>
                            )}
                        </div>
                        {topActions}
                        <Table
                            bordered
                            sticky
                            rowSelection={
                                Boolean(extraBulkActions)
                                    ? {
                                          type: 'checkbox',
                                          onChange(selectedRowKeys, selectedRows, info) {
                                              setSelectedRowGroup(selectedRows);
                                          },
                                          selectedRowKeys: selectedRowGroup.map((item) => item.id),
                                      }
                                    : undefined
                            }
                            sortDirections={['ascend', 'descend']}
                            rowKey={(record) => _get(record, 'id', '')}
                            size={tableSize}
                            dataSource={pagingQuery.data.data}
                            columns={[
                                ...columns.map((item, index) => ({
                                    ...item,
                                    key: item.name,
                                    title: item.title,

                                    render: (value: any, record: any) => {
                                        if (item.render) {
                                            return item.render(value, record, index);
                                        }

                                        const formatValue = Boolean(item.name) ? _get(record, item.name, '') : record;

                                        return (
                                            <FieldDisplay
                                                key={item.name}
                                                type={item.type}
                                                formatter={item.formatter}
                                                value={formatValue}
                                                apiAction={item.apiAction}
                                            />
                                        );
                                    },

                                    sorter: true,
                                })),
                                {
                                    key: 'action',
                                    title: '',
                                    sorter: false,
                                    width: actionSize,
                                    render: (value: any, record: any) => {
                                        if (!actionColumns) {
                                            return null;
                                        }
                                        return <>{typeof actionColumns === 'function' ? actionColumns(record) : actionColumns}</>;
                                    },
                                },
                            ]}
                            pagination={{
                                current: page,
                                pageSize,
                                total: pagingQuery.data.count,
                            }}
                            expandable={expandable}
                            loading={pagingQuery.isFetching}
                            onChange={(pagination, filters, sorter, extra) => {
                                if (sorter) {
                                    const sortKey = _get(sorter, 'columnKey', '');
                                    const sortOrder = _get(sorter, 'order', undefined);

                                    if (sortOrder) {
                                        setOrderBy(sortKey.toString());
                                        setOrder(sortOrder === 'ascend' ? SortOrder.ASC : SortOrder.DESC);
                                    } else {
                                        setOrderBy('createdAt');
                                        setOrder(SortOrder.ASC);
                                    }
                                }

                                setPage(pagination.current || 0);
                                if (pagination.pageSize !== pageSize) {
                                    setPage(1);
                                    setPageSize(pagination.pageSize || pageSizes[0]);
                                }
                            }}
                        />
                    </div>
                </Content>
            </Layout>
        </div>
    );
};

export default TableBuilder;