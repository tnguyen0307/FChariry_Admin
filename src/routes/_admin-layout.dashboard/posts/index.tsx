import React from 'react';

import { createFileRoute } from '@tanstack/react-router';
import { TextAlignJustified } from 'akar-icons';
import { Button, Dropdown, Popover, Table, Tag, Typography } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { NKRouter } from '@/core/NKRouter';
import NKFormField from '@/core/components/field/NKFormField';
import NKTextField from '@/core/components/form/NKTextField';
import { PostStatusTag } from '@/core/components/tags/PostStatusTag';
import { useApproveAllPosts, useApprovePost, useGetAllPosts, useHidePost } from '@/core/hooks/react-query/admin-posts.hook';
import { PostModel, PostStatus } from '@/core/models/post';
import { useNKRouter } from '@/core/routing/hooks/NKRouter';

export const Route = createFileRoute('/_admin-layout/dashboard/posts/')({
    component: RouteComponent,
});

type FilterPost = Pick<PostModel, 'title'>;

const defaultValues: FilterPost = {
    title: '',
};

function RouteComponent() {
    const { data } = useGetAllPosts();

    const { mutate: approve, isPending: isPendingApprove } = useApprovePost();
    const { mutate: hide, isPending: isPendingHide } = useHidePost();

    const isPending = React.useMemo(() => isPendingApprove || isPendingHide, [isPendingApprove, isPendingHide]);

    const router = useNKRouter();

    const { mutate: approveAll, isPending: isPendingAll } = useApproveAllPosts();
    const methods = useForm<FilterPost>({ defaultValues });

    const value = methods.watch();

    const filterData = React.useMemo(() => {
        return data?.filter((item) => {
            if (value.title && !item.title.toLowerCase().includes(value.title.toLowerCase())) {
                return false;
            }

            return true;
        });
    }, [value, data]);

    return (
        <div className="space-y-2">
            <Typography.Title level={3}>Post Management</Typography.Title>
            <Button
                type="primary"
                loading={isPendingAll}
                onClick={() => {
                    approveAll(null, {
                        onSuccess: () => {
                            toast.success('All posts approved successfully');
                        },
                    });
                }}
            >
                Approve All
            </Button>
            <NKFormField methods={methods} className="grid grid-cols-4 gap-2">
                <NKTextField label="Title" name="title" />
            </NKFormField>
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
                        title: 'Vote',
                        dataIndex: 'vote',
                        key: 'vote',
                    },
                    {
                        title: 'Status',
                        dataIndex: 'postStatus',
                        key: 'postStatus',
                        render: (postStatus: PostStatus) => {
                            return <PostStatusTag status={postStatus} />;
                        },
                    },
                    {
                        title: 'Created at',
                        dataIndex: 'createdAt',
                        key: 'createdAt',
                        render: (createdAt: string) => {
                            if (!createdAt) {
                                return '-';
                            }

                            return moment(createdAt).format('DD/MM/YYYY');
                        },
                    },
                    {
                        title: 'Updated at',
                        dataIndex: 'updatedAt',
                        key: 'updatedAt',
                        render: (updatedAt: string) => {
                            if (!updatedAt) {
                                return '-';
                            }

                            return moment(updatedAt).format('DD/MM/YYYY');
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
                                    router.push(NKRouter.dashboard.posts.detail(record.id));
                                },
                            });

                            if (record.postStatus !== PostStatus.BANNED) {
                                if (record.postStatus !== PostStatus.ACTIVE) {
                                    items.push({
                                        key: 'approve',
                                        label: 'Approve',
                                        onClick: () => {
                                            approve(record.id, {
                                                onSuccess: () => {
                                                    toast.success('Post active successfully');
                                                },
                                            });
                                        },
                                    });
                                }

                                if (record.postStatus !== PostStatus.HIDDEN) {
                                    items.push({
                                        key: 'hide',
                                        label: 'Hide',
                                        onClick: () => {
                                            hide(record.id, {
                                                onSuccess: () => {
                                                    toast.success('Post hidden successfully');
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
