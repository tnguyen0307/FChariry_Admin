import { createFileRoute } from '@tanstack/react-router';
import { Descriptions, Typography } from 'antd';
import moment from 'moment';

import { FCRouter } from '@/core/FCRouter';
import { ProjectStatusTag } from '@/core/components/tags/ProjectStatusTag';
import { useGetOrganizationById } from '@/core/hooks/query/admin-organizations.hook';
import { useGetProjectById } from '@/core/hooks/query/admin-projects.hook';
import { useGetUserById } from '@/core/hooks/query/admin-users.hook';
import { ProjectStatus } from '@/core/models/project';
import FCLink from '@/core/routing/components/FCLink';

export const Route = createFileRoute('/_admin-layout/dashboard/projects/$id')({
    component: RouteComponent,
});

function RouteComponent() {
    const { id } = Route.useParams();

    const { data: project, isLoading } = useGetProjectById(id);
    const { data: organization } = useGetOrganizationById(project?.organizationId || '');
    const { data: leader } = useGetUserById(project?.leaderId || '');

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <div className="max-w-4xl">
            <Typography.Title level={3}>Project Details</Typography.Title>
            <Descriptions bordered>
                <Descriptions.Item label="Name" span={3}>
                    {project?.projectName}
                </Descriptions.Item>
                <Descriptions.Item label="Email" span={2}>
                    {project?.email}
                </Descriptions.Item>
                <Descriptions.Item label="Phone">{project?.phoneNumber}</Descriptions.Item>

                <Descriptions.Item label="Status">
                    <ProjectStatusTag status={project?.projectStatus} />
                </Descriptions.Item>
                <Descriptions.Item label="Description" span={3}>
                    {project?.projectDescription}
                </Descriptions.Item>
                <Descriptions.Item label="Planned Start Time" span={2}>
                    {project?.plannedStartTime ? moment(project?.plannedStartTime).format('DD/MM/YYYY') : '-'}
                </Descriptions.Item>
                <Descriptions.Item label="Planned End Time" span={1}>
                    {project?.plannedEndTime ? moment(project?.plannedEndTime).format('DD/MM/YYYY') : '-'}
                </Descriptions.Item>
                <Descriptions.Item label="ActualStart Time" span={2}>
                    {project?.actualStartTime ? moment(project?.actualStartTime).format('DD/MM/YYYY') : '-'}
                </Descriptions.Item>
                <Descriptions.Item label="Actual End Time" span={1}>
                    {project?.actualEndTime ? moment(project?.actualEndTime).format('DD/MM/YYYY') : '-'}
                </Descriptions.Item>
                <Descriptions.Item label="Organization" span={3}>
                    <FCLink href={FCRouter.dashboard.organizations.detail(organization?.id || '')}>{organization?.organizationName}</FCLink>
                </Descriptions.Item>
                <Descriptions.Item label="Leader" span={3}>
                    <FCLink href={FCRouter.dashboard.users.detail(leader?.id || '')}>{leader?.fullName}</FCLink>
                </Descriptions.Item>
            </Descriptions>
        </div>
    );
}
