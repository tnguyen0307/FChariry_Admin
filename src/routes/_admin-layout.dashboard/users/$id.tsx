import { createFileRoute } from '@tanstack/react-router';
import { Descriptions, Typography } from 'antd';
import moment from 'moment';

import { UserRoleTag } from '@/core/components/tags/UserRoleTag';
import { UserStatusTag } from '@/core/components/tags/UserStatusTag';
import { useGetUserById } from '@/core/hooks/query/admin-users.hook';

export const Route = createFileRoute('/_admin-layout/dashboard/users/$id')({
    component: RouteComponent,
});

function RouteComponent() {
    const { id } = Route.useParams();

    const { data: user, isLoading } = useGetUserById(id);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div className="max-w-4xl">
            <Typography.Title level={3}>User Details</Typography.Title>
            <Descriptions bordered>
                <Descriptions.Item label="Name" span={3}>
                    {user?.fullName}
                </Descriptions.Item>
                <Descriptions.Item label="Email" span={2}>
                    {user?.email}
                </Descriptions.Item>
                <Descriptions.Item label="Phone number">{user?.phoneNumber ?? '-'}</Descriptions.Item>
                <Descriptions.Item label="Address" span={3}>
                    {user?.address ?? '-'}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                    <UserStatusTag status={user?.userStatus} />
                </Descriptions.Item>
                <Descriptions.Item label="Role">{<UserRoleTag role={user?.userRole} />}</Descriptions.Item>
                <Descriptions.Item label="Created at">{moment(user?.createdDate).format('DD/MM/YYYY HH:mm:ss')}</Descriptions.Item>
            </Descriptions>
        </div>
    );
}
