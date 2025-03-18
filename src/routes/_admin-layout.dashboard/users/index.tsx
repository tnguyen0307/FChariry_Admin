import React from 'react';

import { createFileRoute } from '@tanstack/react-router';
import { TextAlignJustified } from 'akar-icons';
import { Button, Dropdown, Table, Typography } from 'antd';
import { ItemType, MenuItemType } from 'antd/lib/menu/interface';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { NKRouter } from '@/core/NKRouter';
import FCFormField from '@/core/components/form/FCFormField';
import FCTextField from '@/core/components/form/FCTextField';
import { UserRoleTag } from '@/core/components/tags/UserRoleTag';
import { UserStatusTag } from '@/core/components/tags/UserStatusTag';
import { useAuth } from '@/core/contexts/AuthContext';
import { useBanUserById, useGetAllUsers, useUnBanUserById } from '@/core/hooks/query/admin-users.hook';
import { UserModel, UserRole, UserStatus } from '@/core/models/user';
import { useFCRouter } from '@/core/routing/hooks/FCRouter';

export const Route = createFileRoute('/_admin-layout/dashboard/users/')({
    component: RouteComponent,
});

type FilterUser = {
    searchTerms: string;
};

const defaultValues: FilterUser = {
    searchTerms: '',
};

function RouteComponent() {
    const router = useFCRouter();
    const { data } = useGetAllUsers();

    const { currentUser } = useAuth();

    const { mutate: banUserById, isPending: isPendingBanUser } = useBanUserById();
    const { mutate: unBanUserById, isPending: isPendingUnBanUser } = useUnBanUserById();

    const isPending = React.useMemo(() => isPendingBanUser || isPendingUnBanUser, [isPendingBanUser, isPendingUnBanUser]);

    const methods = useForm<FilterUser>({ defaultValues });

    const value = methods.watch();

    const filterData = React.useMemo(() => {
        const searchTerms = value.searchTerms.toLowerCase();

        if (!searchTerms) {
            return data;
        }

        return data?.filter((item) => {
            if (!item.fullName.toLowerCase().includes(searchTerms) && !item.email.toLowerCase().includes(searchTerms)) {
                return false;
            }

            return true;
        });
    }, [value, data]);

    return (
        <div className="space-y-2">
            <Typography.Title level={3}>User Management</Typography.Title>
            <FCFormField methods={methods} className="grid grid-cols-4 gap-2">
                <FCTextField label="Search terms" name="searchTerms" />
            </FCFormField>
            <Table
                bordered
                dataSource={filterData}
                columns={[
                    {
                        title: 'Fullname',
                        dataIndex: 'fullName',
                        key: 'fullName',
                    },
                    {
                        title: 'Email',
                        dataIndex: 'email',
                        key: 'email',
                    },
                    {
                        title: 'Status',
                        dataIndex: 'userStatus',
                        key: 'userStatus',
                        render: (userStatus: UserStatus) => {
                            return <UserStatusTag status={userStatus} />;
                        },
                    },
                    {
                        title: 'Created Date',
                        dataIndex: 'createdDate',
                        key: 'createdDate',
                        render: (createdDate: string) => {
                            return moment(createdDate).format('DD/MM/YYYY');
                        },
                    },
                    {
                        title: 'Role',
                        dataIndex: 'userRole',
                        key: 'userRole',
                        render: (userRole: UserRole) => {
                            return <UserRoleTag role={userRole} />;
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
                                    router.push(NKRouter.dashboard.users.detail(record.id));
                                },
                            });

                            if (currentUser?.id !== record.id) {
                                if (record.userStatus === 'Banned') {
                                    items.push({
                                        key: 'unban',
                                        label: 'Unban',
                                        onClick: () => {
                                            unBanUserById(record.id, {
                                                onSuccess: () => {
                                                    toast.success('User has been unbanned');
                                                },
                                            });
                                        },
                                    });
                                }

                                if (record.userStatus !== 'Banned') {
                                    items.push({
                                        key: 'ban',
                                        label: 'Ban',
                                        danger: true,
                                        onClick: () => {
                                            banUserById(record.id, {
                                                onSuccess: () => {
                                                    toast.success('User has been banned');
                                                },
                                            });
                                        },
                                    });
                                }
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
