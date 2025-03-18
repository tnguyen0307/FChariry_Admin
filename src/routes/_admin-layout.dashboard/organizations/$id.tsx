import { createFileRoute } from '@tanstack/react-router';
import { Descriptions, Typography } from 'antd';
import moment from 'moment';

import { NKRouter } from '@/core/NKRouter';
import { OrganizationStatusTag } from '@/core/components/tags/OrganizationStatusTag';
import { useGetOrganizationById } from '@/core/hooks/react-query/admin-organizations.hook';
import { useGetUserById } from '@/core/hooks/react-query/admin-users.hook';
import NKLink from '@/core/routing/components/NKLink';

export const Route = createFileRoute('/_admin-layout/dashboard/organizations/$id')({
    component: RouteComponent,
});

function RouteComponent() {
    const { id } = Route.useParams();

    const { data: organization, isLoading } = useGetOrganizationById(id);

    const { data: ceo } = useGetUserById(organization?.ceoId || '');

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!organization) {
        return <div>Organization not found</div>;
    }

    return (
        <div className="max-w-4xl">
            <Typography.Title level={3}>Organization Details</Typography.Title>
            <Descriptions bordered>
                <Descriptions.Item label="Name" span={3}>
                    {organization?.organizationName}
                </Descriptions.Item>
                <Descriptions.Item label="Email" span={2}>
                    {organization?.email}
                </Descriptions.Item>
                <Descriptions.Item label="Phone">{organization?.phoneNumber}</Descriptions.Item>
                <Descriptions.Item label="Address" span={2}>
                    {organization?.address}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                    <OrganizationStatusTag status={organization?.organizationStatus} />
                </Descriptions.Item>
                <Descriptions.Item label="Description" span={3}>
                    {organization?.organizationDescription}
                </Descriptions.Item>
                <Descriptions.Item label="Start Time" span={2}>
                    {moment(organization?.startTime).format('DD/MM/YYYY')}
                </Descriptions.Item>
                <Descriptions.Item label="Shutdown Day" span={1}>
                    {organization?.shutdownDay ? moment(organization?.shutdownDay).format('DD/MM/YYYY') : '-'}
                </Descriptions.Item>
                <Descriptions.Item label="CEO" span={3}>
                    <NKLink href={NKRouter.dashboard.users.detail(ceo?.id || '')}>{ceo?.fullName}</NKLink>
                </Descriptions.Item>
            </Descriptions>
        </div>
    );
}
