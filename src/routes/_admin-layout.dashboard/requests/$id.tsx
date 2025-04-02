import { createFileRoute } from '@tanstack/react-router';
import { Descriptions, Image, Space, Tag, Typography } from 'antd';
import moment from 'moment';

import { FCRouter } from '@/core/FCRouter';
import { RequestStatusTag } from '@/core/components/tags/RequestStatusTag';
import { useGetRequestById } from '@/core/hooks/query/admin-requests.hook';
import { useGetUserById } from '@/core/hooks/query/admin-users.hook';
import { RequestStatus } from '@/core/models/request';
import FCLink from '@/core/routing/components/FCLink';

export const Route = createFileRoute('/_admin-layout/dashboard/requests/$id')({
    component: RouteComponent,
});

function RouteComponent() {
    const { id } = Route.useParams();

    const { data: request, isLoading } = useGetRequestById(id);

    const { data: requestUser } = useGetUserById(request?.userId || '');

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!request) {
        return <div>Request not found</div>;
    }

    return (
        <div className="max-w-4xl">
            <Typography.Title level={3}>Request Details</Typography.Title>
            <Descriptions bordered>
                <Descriptions.Item label="Title" span={3}>
                    {request?.title}
                </Descriptions.Item>
                <Descriptions.Item label="Content" span={3}>
                    {request?.content}
                </Descriptions.Item>
                <Descriptions.Item label="Creation Date">
                    {request.creationDate ? moment(request.creationDate).format('DD/MM/YYYY') : '-'}
                </Descriptions.Item>
                <Descriptions.Item label="Status" span={1}>
                    <Space>
                        <RequestStatusTag status={request?.status} />
                        {/* <Tag color="red">Emergency</Tag> */}
                    </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Request User" span={1}>
                    <FCLink href={FCRouter.dashboard.users.detail(requestUser?.id || '')}>{requestUser?.fullName}</FCLink>
                </Descriptions.Item>
                <Descriptions.Item label="Phone number" span={2}>
                    {request?.phone}
                </Descriptions.Item>
                <Descriptions.Item label="Email">{request?.email}</Descriptions.Item>
                <Descriptions.Item label="Location" span={3}>
                    {request?.location}
                </Descriptions.Item>

                <Descriptions.Item label="Images" span={3}>
                    <div className="flex w-full flex-wrap gap-2">
                        {request.imageUrls?.map((item) => <Image key={item} src={item} className="size-32" />)}
                    </div>
                </Descriptions.Item>
                <Descriptions.Item label="Video" span={3}>
                    <div className="flex w-full flex-col gap-2">
                        {request.videoUrls?.map((item) => <a key={item} className="text-blue-700 underline" target="_blank" href={item} />)}
                    </div>
                </Descriptions.Item>
                {request?.status === RequestStatus.REJECTED && (
                    <Descriptions.Item label="Reason" span={3}>
                        {request?.reason}
                    </Descriptions.Item>
                )}
            </Descriptions>
        </div>
    );
}
