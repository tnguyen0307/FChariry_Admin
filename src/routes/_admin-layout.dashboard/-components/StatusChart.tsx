import * as React from 'react';

import { Typography } from 'antd';

import FCPieChart from '@/core/components/chart/FCPieChart';
import { useGetAllOrganizations } from '@/core/hooks/query/admin-organizations.hook';
import { useGetAllPosts } from '@/core/hooks/query/admin-posts.hook';
import { useGetAllProjects } from '@/core/hooks/query/admin-projects.hook';
import { useGetAllRequests } from '@/core/hooks/query/admin-requests.hook';
import { useGetAllUsers } from '@/core/hooks/query/admin-users.hook';
import { OrganizationStatus } from '@/core/models/organization';
import { PostStatus } from '@/core/models/post';
import { ProjectStatus } from '@/core/models/project';
import { RequestStatus } from '@/core/models/request';
import { UserStatus } from '@/core/models/user';
import { capitalize } from '@/core/utils/string.helper';

interface StatusChartProps {}

const StatusChart: React.FunctionComponent<StatusChartProps> = () => {
    const { data: users } = useGetAllUsers();
    const { data: organizations } = useGetAllOrganizations();
    const { data: projects } = useGetAllProjects();
    const { data: posts } = useGetAllPosts();
    const { data: requests } = useGetAllRequests();

    const userPieChartSeries = React.useMemo(() => {
        return [
            {
                label: UserStatus.Verified,
                value: users?.filter((user) => user.userStatus === UserStatus.Verified).length || 0,
            },
            {
                label: UserStatus.Unverified,
                value: users?.filter((user) => user.userStatus === UserStatus.Unverified).length || 0,
            },
            {
                label: UserStatus.Banned,
                value: users?.filter((user) => user.userStatus === UserStatus.Banned).length || 0,
            },
        ];
    }, [users]);

    const organizationPieChartSeries = React.useMemo(() => {
        return [
            {
                label: capitalize(OrganizationStatus.PENDING),
                value: organizations?.filter((organization) => organization.organizationStatus === OrganizationStatus.PENDING).length || 0,
            },
            {
                label: capitalize(OrganizationStatus.APPROVED),
                value: organizations?.filter((organization) => organization.organizationStatus === OrganizationStatus.APPROVED).length || 0,
            },
            {
                label: capitalize(OrganizationStatus.REJECTED),
                value: organizations?.filter((organization) => organization.organizationStatus === OrganizationStatus.REJECTED).length || 0,
            },
            {
                label: capitalize(OrganizationStatus.BANNED),
                value: organizations?.filter((organization) => organization.organizationStatus === OrganizationStatus.BANNED).length || 0,
            },
        ];
    }, [organizations]);

    const projectPieChartSeries = React.useMemo(() => {
        return [
            {
                label: capitalize(ProjectStatus.PENDING),
                value: projects?.filter((project) => project.projectStatus === ProjectStatus.PENDING).length || 0,
            },
            {
                label: capitalize(ProjectStatus.APPROVED),
                value: projects?.filter((project) => project.projectStatus === ProjectStatus.APPROVED).length || 0,
            },
            {
                label: capitalize(ProjectStatus.REJECTED),
                value: projects?.filter((project) => project.projectStatus === ProjectStatus.REJECTED).length || 0,
            },
            {
                label: capitalize(ProjectStatus.BANNED),
                value: projects?.filter((project) => project.projectStatus === ProjectStatus.BANNED).length || 0,
            },
        ];
    }, [projects]);

    const postPieChartSeries = React.useMemo(() => {
        return [
            {
                label: capitalize(PostStatus.PENDING),
                value: posts?.filter((post) => post.postStatus === PostStatus.PENDING).length || 0,
            },
            {
                label: capitalize(PostStatus.APPROVED),
                value: posts?.filter((post) => post.postStatus === PostStatus.APPROVED).length || 0,
            },
            {
                label: capitalize(PostStatus.REJECTED),
                value: posts?.filter((post) => post.postStatus === PostStatus.REJECTED).length || 0,
            },
            {
                label: capitalize(PostStatus.BANNED),
                value: posts?.filter((post) => post.postStatus === PostStatus.BANNED).length || 0,
            },
        ];
    }, [posts]);

    const requestPieChartSeries = React.useMemo(() => {
        return [
            {
                label: capitalize(RequestStatus.PENDING),
                value: requests?.filter((request) => request.status === RequestStatus.PENDING).length || 0,
            },
            {
                label: capitalize(RequestStatus.APPROVED),
                value: requests?.filter((request) => request.status === RequestStatus.APPROVED).length || 0,
            },
            {
                label: capitalize(RequestStatus.REJECTED),
                value: requests?.filter((request) => request.status === RequestStatus.REJECTED).length || 0,
            },
        ];
    }, [requests]);

    return (
        <div className="flex flex-col gap-2 bg-gray-100 px-4">
            <Typography.Title level={4}>Status report</Typography.Title>
            <div className="grid grid-cols-3 gap-2 pb-4">
                <FCPieChart
                    title="Users"
                    labels={userPieChartSeries.map((item) => item.label)}
                    series={userPieChartSeries.map((item) => item.value)}
                />
                <FCPieChart
                    title="Organizations"
                    labels={organizationPieChartSeries.map((item) => item.label)}
                    series={organizationPieChartSeries.map((item) => item.value)}
                />
                <FCPieChart
                    title="Projects"
                    labels={projectPieChartSeries.map((item) => item.label)}
                    series={projectPieChartSeries.map((item) => item.value)}
                />
                <FCPieChart
                    title="Posts"
                    labels={postPieChartSeries.map((item) => item.label)}
                    series={postPieChartSeries.map((item) => item.value)}
                />
                <FCPieChart
                    title="Requests"
                    labels={requestPieChartSeries.map((item) => item.label)}
                    series={requestPieChartSeries.map((item) => item.value)}
                />
            </div>
        </div>
    );
};

export default StatusChart;
