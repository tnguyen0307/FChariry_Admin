import React from 'react';

import { createFileRoute } from '@tanstack/react-router';
import { TextAlignJustified } from 'akar-icons';
import { Button, Dropdown, Popover, Table, Typography } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { NKRouter } from '@/core/NKRouter';
import FCFormField from '@/core/components/form/FCFormField';
import FCTextField from '@/core/components/form/FCTextField';
import { OrganizationStatusTag } from '@/core/components/tags/OrganizationStatusTag';
import {
    useApproveAllOrganizations,
    useApproveOrganization,
    useGetAllOrganizations,
    useHideOrganization,
} from '@/core/hooks/react-query/admin-organizations.hook';
import { OrganizationModel, OrganizationStatus } from '@/core/models/organization';
import { useNKRouter } from '@/core/routing/hooks/NKRouter';

export const Route = createFileRoute('/_admin-layout/dashboard/organizations/')({
    component: RouteComponent,
});

type FilterOrganization = {
    searchTerms: string;
};

const defaultValues: FilterOrganization = {
    searchTerms: '',
};

function RouteComponent() {
    const { data } = useGetAllOrganizations();
    const { mutate: approve, isPending: isPendingApprove } = useApproveOrganization();
    const { mutate: hide, isPending: isPendingHide } = useHideOrganization();

    const isPending = React.useMemo(() => isPendingApprove || isPendingHide, [isPendingApprove, isPendingHide]);
    const { mutate: approveAll, isPending: isPendingAll } = useApproveAllOrganizations();

    const router = useNKRouter();

    const methods = useForm<FilterOrganization>({ defaultValues });

    const value = methods.watch();

    const filterData = React.useMemo(() => {
        const searchTerms = value.searchTerms.toLowerCase();

        if (!searchTerms) {
            return data;
        }

        return data?.filter((item) => {
            if (!item.organizationName.toLowerCase().includes(searchTerms) && !item.email.toLowerCase().includes(searchTerms)) {
                return false;
            }

            return true;
        });
    }, [value, data]);

    return (
        <div className="space-y-2">
            <Typography.Title level={3}>Organization Management</Typography.Title>
            <Button
                type="primary"
                loading={isPendingAll}
                onClick={() => {
                    approveAll(null, {
                        onSuccess: () => {
                            toast.success('All organizations approved successfully');
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
                        title: 'Name',
                        dataIndex: 'organizationName',
                        key: 'organizationName',
                    },
                    {
                        title: 'Description',
                        dataIndex: 'organizationDescription',
                        key: 'organizationDescription',
                        render: (description: string) => {
                            return (
                                <Popover content={description} trigger="hover">
                                    <span className="line-clamp-2 w-full max-w-96">{description}</span>
                                </Popover>
                            );
                        },
                    },
                    {
                        title: 'Email',
                        dataIndex: 'email',
                        key: 'email',
                    },
                    {
                        title: 'Start Time',
                        dataIndex: 'startTime',
                        key: 'startTime',
                        render: (startTime: string) => {
                            if (!startTime) {
                                return '-';
                            }

                            return moment(startTime).format('DD/MM/YYYY');
                        },
                    },
                    {
                        title: 'Shutdown Day',
                        dataIndex: 'shutdownDay',
                        key: 'shutdownDay',
                        render: (shutdownDay: string) => {
                            if (!shutdownDay) {
                                return '-';
                            }

                            return moment(shutdownDay).format('DD/MM/YYYY');
                        },
                    },
                    {
                        title: 'Status',
                        dataIndex: 'organizationStatus',
                        key: 'organizationStatus',
                        render: (status: OrganizationStatus) => {
                            return <OrganizationStatusTag status={status} />;
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
                                    router.push(NKRouter.dashboard.organizations.detail(record.id));
                                },
                            });

                            if (record.organizationStatus === OrganizationStatus.PENDING) {
                                items.push({
                                    key: 'approve',
                                    label: 'Approve',
                                    onClick: () => {
                                        approve(record.id, {
                                            onSuccess: () => {
                                                toast.success('Organization approved successfully');
                                            },
                                        });
                                    },
                                });
                            }

                            if (record.organizationStatus === OrganizationStatus.APPROVED) {
                                items.push({
                                    key: 'hide',
                                    label: 'Hide',
                                    onClick: () => {
                                        hide(record.id, {
                                            onSuccess: () => {
                                                toast.success('Organization hidden successfully');
                                            },
                                        });
                                    },
                                    danger: true,
                                });
                            }

                            if (record.organizationStatus === OrganizationStatus.HIDDEN) {
                                items.push({
                                    key: 'unhide',
                                    label: 'Unhide',
                                    onClick: () => {
                                        approve(record.id, {
                                            onSuccess: () => {
                                                toast.success('Organization unhidden successfully');
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
