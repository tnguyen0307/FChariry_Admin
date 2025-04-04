import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { TextAlignJustified } from 'akar-icons';
import { Button, Dropdown, Popconfirm, Popover, Table, Tag, Typography } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import Joi from 'joi';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { FCRouter } from '@/core/FCRouter';
import { adminPostsApi } from '@/core/api/admin/posts';
import { tagsApi } from '@/core/api/admin/tags';
import { FCFormType } from '@/core/components/form/FCForm';
import FCFormField from '@/core/components/form/FCFormField';
import FCTextField from '@/core/components/form/FCTextField';
import FormBuilder from '@/core/components/form/FormBuilder';
import ModalBuilder from '@/core/components/modal/ModalBuilder';
import { PostStatusTag } from '@/core/components/tags/PostStatusTag';
import { QUERY_CONSTANT } from '@/core/constant/query';
import { useAllTags, useDeleteTag } from '@/core/hooks/query/admin-tags.hook';
import { TagModel } from '@/core/models/tag';
import { useFCRouter } from '@/core/routing/hooks/FCRouter';

export const Route = createFileRoute('/_admin-layout/dashboard/tags/')({
    component: RouteComponent,
});

type FilterPost = Pick<TagModel, 'tagName'>;

const defaultValues: FilterPost = {
    tagName: '',
};

function RouteComponent() {
    const queryClient = useQueryClient();
    const { data } = useAllTags();

    const router = useFCRouter();

    const methods = useForm<FilterPost>({ defaultValues });
    const { mutate: deleteTag, isPending: isPendingDelete } = useDeleteTag();

    const value = methods.watch();

    const filterData = React.useMemo(() => {
        return data?.filter((item) => {
            if (value.tagName && !item.tagName.toLowerCase().includes(value.tagName.toLowerCase())) {
                return false;
            }

            return true;
        });
    }, [value, data]);

    return (
        <div className="space-y-3">
            <div className="flex w-full items-end justify-between">
                <Typography.Title level={3} className="!m-0">
                    Tag Management
                </Typography.Title>
                <ModalBuilder
                    btnProps={{
                        className: 'bg-blue-500 px-3 py-2 rounded-sm text-white cursor-pointer',
                    }}
                    btnLabel="Create"
                    title="Create Tag"
                >
                    {(close) => (
                        <FormBuilder
                            defaultValues={{
                                id: '',
                                tagName: '',
                            }}
                            apiAction={tagsApi.create}
                            fields={[{ name: 'tagName', label: 'Name', type: FCFormType.TEXT }]}
                            schema={{
                                id: Joi.any().optional(),
                                tagName: Joi.string().required(),
                            }}
                            onExtraSuccessAction={() => {
                                toast.success('Tag created successfully');
                                close();
                                queryClient.invalidateQueries({
                                    queryKey: [QUERY_CONSTANT.ALL_TAGS],
                                });
                            }}
                        />
                    )}
                </ModalBuilder>
            </div>
            <Table
                bordered
                dataSource={filterData}
                columns={[
                    {
                        title: 'ID',
                        dataIndex: 'id',
                        key: 'id',
                    },
                    {
                        title: 'Name',
                        dataIndex: 'tagName',
                        key: 'tagName',
                        sorter: (a, b) => a.tagName.localeCompare(b.tagName),
                    },
                    {
                        title: 'Action',
                        key: 'id',
                        dataIndex: 'id',
                        width: 200,
                        render: (_: any, record) => {
                            const items: ItemType<MenuItemType>[] = [];

                            items.push({
                                key: 'edit',
                                label: (
                                    <ModalBuilder btnLabel="Edit" title="Edit Tag">
                                        {(close) => (
                                            <FormBuilder
                                                apiAction={tagsApi.update}
                                                defaultValues={record}
                                                fields={[{ name: 'tagName', label: 'Name', type: FCFormType.TEXT }]}
                                                schema={{
                                                    tagName: Joi.string().required(),
                                                    id: Joi.string().required(),
                                                }}
                                                onExtraSuccessAction={() => {
                                                    toast.success('Tag updated successfully');
                                                    close();
                                                    queryClient.invalidateQueries({
                                                        queryKey: [QUERY_CONSTANT.ALL_TAGS],
                                                    });
                                                }}
                                            />
                                        )}
                                    </ModalBuilder>
                                ),
                            });

                            items.push({
                                key: 'delete',
                                danger: true,
                                label: (
                                    <Popconfirm
                                        title="Are you sure you want to delete this tag?"
                                        onConfirm={() => {
                                            deleteTag(record.id, {
                                                onSuccess: () => {
                                                    toast.success('Tag deleted successfully');
                                                    queryClient.invalidateQueries({
                                                        queryKey: [QUERY_CONSTANT.ALL_TAGS],
                                                    });
                                                },
                                            });
                                        }}
                                    >
                                        Delete
                                    </Popconfirm>
                                ),
                            });

                            return (
                                <Dropdown menu={{ items }}>
                                    <Button disabled={isPendingDelete} className="p-1">
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

