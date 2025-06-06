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
import { ProjectStatusTag } from '@/core/components/tags/ProjectStatusTag';
import { useBanProject, useGetAllProjects } from '@/core/hooks/query/admin-projects.hook';
import { ProjectStatus } from '@/core/models/project';
import { useFCRouter } from '@/core/routing/hooks/FCRouter';

export const Route = createFileRoute('/_admin-layout/dashboard/projects/')({
    component: RouteComponent,
});

type FilterProject = {
    searchTerms: string;
};

const defaultValues: FilterProject = {
    searchTerms: '',
};

function RouteComponent() {
    const { data } = useGetAllProjects();

    // const { mutate: approve, isPending: isPendingApprove } = useApproveProject();
    // const { mutate: hide, isPending: isPendingHide } = useHideProject();

    const { mutate: ban, isPending: isPendingBan } = useBanProject();

    const isPending = React.useMemo(() => isPendingBan, [isPendingBan]);

    const router = useFCRouter();

    // const { mutate: approveAll, isPending: isPendingAll } = useApproveAllProjects();
    const methods = useForm<FilterProject>({ defaultValues });

    const value = methods.watch();

    const filterData = React.useMemo(() => {
        const searchTerms = value.searchTerms.toLowerCase();

        if (!searchTerms) {
            return data;
        }

        return data?.filter((item) => {
            if (!item.projectName.toLowerCase().includes(searchTerms) && !item.email.toLowerCase().includes(searchTerms)) {
                return false;
            }

            return true;
        });
    }, [value, data]);

    return (
        <div className="space-y-3">
            <Typography.Title level={3}>Project Management</Typography.Title>
            {/* <Button
        type="primary"
        loading={isPendingAll}
        onClick={() => {
          approveAll(null, {
            onSuccess: () => {
              toast.success('All projects approved successfully');
            },
          });
        }}
      >
        Approve All
      </Button> */}
            <FCFormField methods={methods} className="grid grid-cols-4 gap-2">
                <FCTextField label="Search terms" name="searchTerms" />
            </FCFormField>
            <Table
                bordered
                dataSource={filterData}
                columns={[
                    {
                        title: 'Name',
                        dataIndex: 'projectName',
                        key: 'projectName',
                    },
                    {
                        title: 'Description',
                        dataIndex: 'projectDescription',
                        key: 'projectDescription',
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
                        dataIndex: 'actualStartTime',
                        key: 'actualStartTime',
                        render: (startTime: string) => {
                            if (!startTime) {
                                return '-';
                            }

                            return moment(startTime).format('DD/MM/YYYY');
                        },
                        sorter: (a, b) => {
                            if (!a.actualStartTime || !b.actualStartTime) return 0;
                            return moment(a.actualStartTime).valueOf() - moment(b.actualStartTime).valueOf();
                        },
                    },
                    {
                        title: 'Planned End Time',
                        dataIndex: 'plannedEndTime',
                        key: 'plannedEndTime',
                        render: (plannedEndTime: string) => {
                            if (!plannedEndTime) {
                                return '-';
                            }

                            return moment(plannedEndTime).format('DD/MM/YYYY');
                        },
                        sorter: (a, b) => {
                            if (!a.plannedEndTime || !b.plannedEndTime) return 0;
                            return moment(a.plannedEndTime).valueOf() - moment(b.plannedEndTime).valueOf();
                        },
                    },
                    {
                        title: 'Status',
                        dataIndex: 'projectStatus',
                        key: 'projectStatus',
                        render: (status: ProjectStatus) => {
                            return <ProjectStatusTag status={status} />;
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
                                    router.push(FCRouter.dashboard.projects.detail(record.id));
                                },
                            });

                            if (record.projectStatus !== ProjectStatus.BANNED) {
                                items.push({
                                    key: 'ban',
                                    label: 'Ban',
                                    onClick: () => {
                                        ban(record.id, {
                                            onSuccess: () => {
                                                toast.success('Project banned successfully');
                                            },
                                        });
                                    },
                                    danger: true,
                                });
                            }

                            // if (record.projectStatus === ProjectStatus.PENDING) {
                            //   items.push({
                            //     key: 'approve',
                            //     label: 'Approve',
                            //     onClick: () => {
                            //       approve(record.id, {
                            //         onSuccess: () => {
                            //           toast.success('Project approved successfully');
                            //         },
                            //       });
                            //     },
                            //   });
                            // }

                            // if (record.projectStatus === ProjectStatus.APPROVED) {
                            //   items.push({
                            //     key: 'hide',
                            //     label: 'Hide',
                            //     onClick: () => {
                            //       hide(record.id, {
                            //         onSuccess: () => {
                            //           toast.success('Project hidden successfully');
                            //         },
                            //       });
                            //     },
                            //     danger: true,
                            //   });
                            // }

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
