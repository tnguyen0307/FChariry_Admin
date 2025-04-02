import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { TextAlignJustified } from 'akar-icons';
import { Button, Dropdown, Input, Table, Typography } from 'antd';
import { ItemType, MenuItemType } from 'antd/lib/menu/interface';
import Joi from 'joi';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { FCRouter } from '@/core/FCRouter';
import { adminUsersApi } from '@/core/api/admin/users';
import { FCFormType } from '@/core/components/form/FCForm';
import FCFormField from '@/core/components/form/FCFormField';
import FCTextField from '@/core/components/form/FCTextField';
import FormBuilder from '@/core/components/form/FormBuilder';
import ModalBuilder from '@/core/components/modal/ModalBuilder';
import { UserRoleTag } from '@/core/components/tags/UserRoleTag';
import { UserStatusTag } from '@/core/components/tags/UserStatusTag';
import { QUERY_CONSTANT } from '@/core/constant/query';
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
    const queryClient = useQueryClient();
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
        <div className="space-y-3">
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
                            if (!createdDate) {
                                return '-';
                            }

                            return moment(createdDate).format('DD/MM/YYYY');
                        },
                        sorter: (a, b) => {
                            console.log(a.createdDate, b.createdDate);
                            if (!a.createdDate || !b.createdDate) return 0;
                            return moment(a.createdDate).valueOf() - moment(b.createdDate).valueOf();
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
                                    router.push(FCRouter.dashboard.users.detail(record.id));
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
                                        label: (
                                            <ModalBuilder btnLabel="Ban" title="Ban User">
                                                {(close) => (
                                                    <FormBuilder
                                                        apiAction={adminUsersApi.banUserById}
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
                                                            toast.success('User has been banned');
                                                            queryClient.invalidateQueries({ queryKey: [QUERY_CONSTANT.ALL_USERS] });
                                                            close();
                                                        }}
                                                    ></FormBuilder>
                                                )}
                                            </ModalBuilder>
                                        ),
                                        danger: true,
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
