import { createFileRoute } from '@tanstack/react-router';
import { Descriptions, Typography } from 'antd';
import moment from 'moment';

import { FCRouter } from '@/core/FCRouter';
import { PostStatusTag } from '@/core/components/tags/PostStatusTag';
import { useGetPostById } from '@/core/hooks/query/admin-posts.hook';
import { useGetUserById } from '@/core/hooks/query/admin-users.hook';
import { PostStatus } from '@/core/models/post';
import FCLink from '@/core/routing/components/FCLink';

export const Route = createFileRoute('/_admin-layout/dashboard/posts/$id')({
    component: RouteComponent,
});

function RouteComponent() {
    const { id } = Route.useParams();

    const { data: post, isLoading } = useGetPostById(id);

    const { data: author } = useGetUserById(post?.userId || '');

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div className="max-w-4xl">
            <Typography.Title level={3}>Post Details</Typography.Title>
            <Descriptions bordered>
                <Descriptions.Item label="Title" span={3}>
                    {post?.title}
                </Descriptions.Item>
                <Descriptions.Item label="Content" span={3}>
                    {post?.content}
                </Descriptions.Item>
                <Descriptions.Item label="Vote">{post?.vote}</Descriptions.Item>
                <Descriptions.Item label="Status">
                    <PostStatusTag status={post?.postStatus} />
                </Descriptions.Item>
                <Descriptions.Item label="Author" span={3}>
                    <FCLink href={FCRouter.dashboard.users.detail(author?.id || '')}>{author?.fullName}</FCLink>
                </Descriptions.Item>
                <Descriptions.Item label="Created At">{post.createdAt ? moment(post.createdAt).format('DD/MM/YYYY') : '-'}</Descriptions.Item>
                <Descriptions.Item label="Updated At">{post.updatedAt ? moment(post.updatedAt).format('DD/MM/YYYY') : '-'}</Descriptions.Item>
                {post?.postStatus === PostStatus.REJECTED && (
                    <Descriptions.Item label="Rejected Reason" span={3}>
                        {post?.reason}
                    </Descriptions.Item>
                )}
            </Descriptions>
        </div>
    );
}
