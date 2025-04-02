import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { TextAlignJustified } from 'akar-icons';
import { Button, Dropdown, Popover, Space, Table, Tag, Typography } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import Joi from 'joi';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { FCRouter } from '@/core/FCRouter';
import { adminRequestsApi } from '@/core/api/admin/requests';
import { FCFormType } from '@/core/components/form/FCForm';
import FCFormField from '@/core/components/form/FCFormField';
import FCTextField from '@/core/components/form/FCTextField';
import FormBuilder from '@/core/components/form/FormBuilder';
import ModalBuilder from '@/core/components/modal/ModalBuilder';
import { RequestStatusTag } from '@/core/components/tags/RequestStatusTag';
import { QUERY_CONSTANT } from '@/core/constant/query';
import { useApproveAllRequests, useApproveRequest, useGetAllRequests, useRejectRequest } from '@/core/hooks/query/admin-requests.hook';
import { RequestStatus } from '@/core/models/request';
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
    const queryClient = useQueryClient();
    const { data } = useGetAllRequests();

    const { mutate: approve, isPending: isPendingApprove } = useApproveRequest();
    const { mutate: reject, isPending: isPendingReject } = useRejectRequest();

    const isPending = React.useMemo(() => isPendingApprove || isPendingReject, [isPendingApprove, isPendingReject]);

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
        <div className="space-y-3">
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
                                    {/* {record.emergency && <Tag color="red">Emergency</Tag>} */}
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
                        sorter: (a, b) => {
                            if (!a.creationDate || !b.creationDate) return 0;
                            return moment(a.creationDate).valueOf() - moment(b.creationDate).valueOf();
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

                                items.push({
                                    key: 'reject',
                                    label: (
                                        <ModalBuilder btnLabel="Reject" title="Reject Request">
                                            {(close) => (
                                                <FormBuilder
                                                    apiAction={adminRequestsApi.reject}
                                                    defaultValues={{ reason: '', id: record.id }}
                                                    fields={[
                                                        {
                                                            label: 'Reason',
                                                            name: 'reason',
                                                            type: FCFormType.TEXT,
                                                        },
                                                    ]}
                                                    schema={{
                                                        id: Joi.string().required(),
                                                        reason: Joi.string().required(),
                                                    }}
                                                    onExtraSuccessAction={() => {
                                                        toast.success('Request rejected successfully');
                                                        queryClient.invalidateQueries({ queryKey: [QUERY_CONSTANT.ALL_REQUESTS] });
                                                        close();
                                                    }}
                                                ></FormBuilder>
                                            )}
                                        </ModalBuilder>
                                    ),
                                    danger: true,
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
