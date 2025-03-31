import React from 'react';

import { createFileRoute } from '@tanstack/react-router';
import { TextAlignJustified } from 'akar-icons';
import { Button, Dropdown, Popover, Table, Typography } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { FCRouter } from '@/core/FCRouter';
import FCFormField from '@/core/components/form/FCFormField';
import FCTextField from '@/core/components/form/FCTextField';
import { OrganizationStatusTag } from '@/core/components/tags/OrganizationStatusTag';
import {
    useActivateAllOrganizations,
    useActivateOrganization,
    useBanOrganization,
    useGetAllOrganizations,
    useRejectOrganization,
    useUnbanOrganization,
} from '@/core/hooks/query/admin-organizations.hook';
import { OrganizationModel, OrganizationStatus } from '@/core/models/organization';
import { useFCRouter } from '@/core/routing/hooks/FCRouter';

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
    const { mutate: activate, isPending: isPendingActivate } = useActivateOrganization();
    const { mutate: reject, isPending: isPendingReject } = useRejectOrganization();
    const { mutate: unban, isPending: isPendingUnban } = useUnbanOrganization();
    const { mutate: ban, isPending: isPendingBan } = useBanOrganization();

    const isPending = React.useMemo(() => isPendingActivate || isPendingReject || isPendingUnban || isPendingBan, [isPendingActivate, isPendingReject, isPendingUnban, isPendingBan]);
    const { mutate: activateAll, isPending: isPendingActivateAll } = useActivateAllOrganizations();

    const router = useFCRouter();

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
        <div className="space-y-3">
            <Typography.Title level={3}>Organization Management</Typography.Title>
            <Button
                type="primary"
                loading={isPendingActivateAll}
                onClick={() => {
                    activateAll(null, {
                        onSuccess: () => {
                            toast.success('All organizations activated successfully');
                        },
                    });
                }}
            >
                Activate All
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
                                    router.push(FCRouter.dashboard.organizations.detail(record.id));
                                },
                            });

                            if (record.organizationStatus === OrganizationStatus.PENDING) {
                                items.push({
                                    key: 'approve',
                                    label: 'Approve',
                                    onClick: () => {
                                        activate(record.id, {
                                            onSuccess: () => {
                                                toast.success('Organization activated successfully');
                                            },
                                        });
                                    },
                                });

                                items.push({
                                    key: 'reject',
                                    label: 'Reject',
                                    onClick: () => {
                                        reject(record.id, {
                                            onSuccess: () => {
                                                toast.success('Organization rejected successfully');
                                            },
                                        });
                                    },
                                });
                            }

                            if (record.organizationStatus === OrganizationStatus.APPROVED) {
                                items.push({
                                    key: 'ban',
                                    label: 'Ban',
                                    onClick: () => {
                                        ban(record.id, {
                                            onSuccess: () => {
                                                toast.success('Organization banned successfully');
                                            },
                                        });
                                    },
                                });
                            }

                            if (record.organizationStatus === OrganizationStatus.BANNED) {
                                items.push({
                                    key: 'unban',
                                    label: 'Unban',
                                    onClick: () => {
                                        unban(record.id, {
                                            onSuccess: () => {
                                                toast.success('Organization unbanned successfully');
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
