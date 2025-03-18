import React from 'react';

import { createFileRoute } from '@tanstack/react-router';
import { TextAlignJustified } from 'akar-icons';
import { Button, Dropdown, Popover, Space, Table, Tag, Typography } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { FCRouter } from '@/core/FCRouter';
import FCFormField from '@/core/components/form/FCFormField';
import FCTextField from '@/core/components/form/FCTextField';
import { RequestStatusTag } from '@/core/components/tags/RequestStatusTag';
import { useApproveAllRequests, useApproveRequest, useGetAllRequests, useHideRequest } from '@/core/hooks/query/admin-requests.hook';
import { RequestModel, RequestStatus } from '@/core/models/request';
import { useFCRouter } from '@/core/routing/hooks/FCRouter';

export const Route = createFileRoute('/_admin-layout/dashboard/requests/')({
    component: RouteComponent,
});

type FilterRequest = {
    searchTerms: string;
};

const defaultValues: FilterRequest = {
    searchTerms: '',
};

function RouteComponent() {
    const { data } = useGetAllRequests();

    const { mutate: approve, isPending: isPendingApprove } = useApproveRequest();
    const { mutate: hide, isPending: isPendingHide } = useHideRequest();

    const isPending = React.useMemo(() => isPendingApprove || isPendingHide, [isPendingApprove, isPendingHide]);

    const router = useFCRouter();

    const { mutate: approveAll, isPending: isPendingAll } = useApproveAllRequests();
    const methods = useForm<FilterRequest>({ defaultValues });

    const value = methods.watch();

    const filterData = React.useMemo(() => {
        const searchTerms = value.searchTerms.toLowerCase();

        if (!searchTerms) {
            return data;
        }

        return data?.filter((item) => {
            if (!item.title.toLowerCase().includes(searchTerms) && !item.email.toLowerCase().includes(searchTerms)) {
                return false;
            }

            return true;
        });
    }, [value, data]);

    return (
        <div className="space-y-2">
            <Typography.Title level={3}>Request Management</Typography.Title>
            <Button
                type="primary"
                loading={isPendingAll}
                onClick={() => {
                    approveAll(null, {
                        onSuccess: () => {
                            toast.success('All requests approved successfully');
                        },
                    });
                }}
            >
                Approve All
            </Button>
            <FCFormField methods={methods} className="grid grid-cols-4 gap-2">
                <FCTextField label="Search terms" name="searchTerms" />
            </FCFormField>
            <Table
                bordered
                dataSource={filterData}
                columns={[
                    {
                        title: 'Title',
                        dataIndex: 'title',
                        key: 'title',
                    },
                    {
                        title: 'Content',
                        dataIndex: 'content',
                        key: 'content',
                        render: (content: string) => {
                            return (
                                <Popover content={content} trigger="hover">
                                    <span className="line-clamp-2 w-full max-w-96">{content}</span>
                                </Popover>
                            );
                        },
                    },
                    {
                        title: 'Phone number',
                        dataIndex: 'phone',
                        key: 'phone',
                    },
                    {
                        title: 'Email',
                        dataIndex: 'email',
                        key: 'email',
                    },
                    {
                        title: 'Location',
                        dataIndex: 'location',
                        key: 'location',
                    },
                    {
                        title: 'Status',
                        dataIndex: 'status',
                        key: 'status',
                        render: (status: RequestStatus, record) => {
                            return (
                                <Space>
                                    <RequestStatusTag status={status} />
                                    {record.emergency && <Tag color="red">Emergency</Tag>}
                                </Space>
                            );
                        },
                    },
                    {
                        title: 'Creation date',
                        dataIndex: 'creationDate',
                        key: 'creationDate',
                        render: (creationDate: string) => {
                            if (!creationDate) {
                                return '-';
                            }

                            return moment(creationDate).format('DD/MM/YYYY');
                        },
                    },
                    {
                        title: 'Action',
                        key: 'id',
                        dataIndex: 'id',
                        width: 200,
                        render: (_: any, record) => {
                            const items: ItemType<MenuItemType>[] = [];

                            items.push({
                                key: 'view',
                                label: 'View',
                                onClick: () => {
                                    router.push(FCRouter.dashboard.requests.detail(record.id));
                                },
                            });

                            if (record.status === RequestStatus.PENDING) {
                                items.push({
                                    key: 'approve',
                                    label: 'Approve',
                                    onClick: () => {
                                        approve(record.id, {
                                            onSuccess: () => {
                                                toast.success('Request approved successfully');
                                            },
                                        });
                                    },
                                });
                            }

                            if (record.status === RequestStatus.APPROVED) {
                                items.push({
                                    key: 'hide',
                                    label: 'Hide',
                                    onClick: () => {
                                        hide(record.id, {
                                            onSuccess: () => {
                                                toast.success('Request hidden successfully');
                                            },
                                        });
                                    },
                                    danger: true,
                                });
                            }

                            if (record.status === RequestStatus.HIDDEN) {
                                items.push({
                                    key: 'unhide',
                                    label: 'Unhide',
                                    onClick: () => {
                                        approve(record.id, {
                                            onSuccess: () => {
                                                toast.success('Request unhidden successfully');
                                            },
                                        });
                                    },
                                });
                            }

                            return (
                                <Dropdown menu={{ items }}>
                                    <Button disabled={isPending} className="p-1">
                                        <TextAlignJustified />
                                    </Button>
                                </Dropdown>
                            );
                        },
                    },
                ]}
            />
        </div>
    );
}
