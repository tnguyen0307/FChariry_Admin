import React from 'react';

import { createFileRoute } from '@tanstack/react-router';
import { TextAlignJustified } from 'akar-icons';
import { Button, Dropdown, Popover, Table, Tag, Typography } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { FCRouter } from '@/core/FCRouter';
import FCFormField from '@/core/components/form/FCFormField';
import FCTextField from '@/core/components/form/FCTextField';
import { PostStatusTag } from '@/core/components/tags/PostStatusTag';
import { useGetAllPosts, useActivatePost, useActivateAllPosts, useRejectPost, useBanPost, useUnbanPost } from '@/core/hooks/query/admin-posts.hook';
import { PostModel, PostStatus } from '@/core/models/post';
import { useFCRouter } from '@/core/routing/hooks/FCRouter';

export const Route = createFileRoute('/_admin-layout/dashboard/posts/')({
  component: RouteComponent,
});

type FilterPost = Pick<PostModel, 'title'>;

const defaultValues: FilterPost = {
  title: '',
};

function RouteComponent() {
  const { data } = useGetAllPosts();

  const { mutate: activate, isPending: isPendingActivate } = useActivatePost();
  const { mutate: reject, isPending: isPendingReject } = useRejectPost();
  const { mutate: ban, isPending: isPendingBan } = useBanPost();
  const { mutate: unban, isPending: isPendingUnban } = useUnbanPost();

  const isPending = React.useMemo(() => isPendingActivate || isPendingReject || isPendingBan || isPendingUnban, [isPendingActivate, isPendingReject, isPendingBan, isPendingUnban]);

  const router = useFCRouter();

  const { mutate: activateAll, isPending: isPendingActivateAll } = useActivateAllPosts();
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
    <div className="space-y-3">
      <Typography.Title level={3}>Post Management</Typography.Title>
      <Button
        type="primary"
        loading={isPendingActivateAll}
        onClick={() => {
          activateAll(null, {
            onSuccess: () => {
              toast.success('All posts activated successfully');
            },
          });
        }}
      >
        Activate All
      </Button>
      <FCFormField methods={methods} className="grid grid-cols-4 gap-2">
        <FCTextField label="Title" name="title" />
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
                  router.push(FCRouter.dashboard.posts.detail(record.id));
                },
              });

              if (record.postStatus === PostStatus.PENDING) {
                items.push({
                  key: 'approve',
                  label: 'Approve',
                  onClick: () => {
                    activate(record.id, {
                      onSuccess: () => {
                        toast.success('Post approved successfully');
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
                        toast.success('Post rejected successfully');
                      },
                    });
                  },
                });
              }

              if (record.postStatus === PostStatus.APPROVED) {
                items.push({
                  key: 'ban',
                  label: 'Ban',
                  onClick: () => {
                    ban(record.id, {
                      onSuccess: () => {
                        toast.success('Post banned successfully');
                      },
                    });
                  },
                });
              }

              if (record.postStatus === PostStatus.BANNED) {
                items.push({
                  key: 'unban',
                  label: 'Unban',
                  onClick: () => {
                    unban(record.id, {
                      onSuccess: () => {
                        toast.success('Post unbanned successfully');
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
