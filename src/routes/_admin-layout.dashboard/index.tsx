import * as React from 'react';

import { createFileRoute } from '@tanstack/react-router';
import { Typography } from 'antd';
import dayjs from 'dayjs';
import _ from 'lodash';
import moment from 'moment';

import ChartLabel from '@/core/components/chart/ChartLabel';
import { useGetAllOrganizations } from '@/core/hooks/query/admin-organizations.hook';
import { useGetAllPosts } from '@/core/hooks/query/admin-posts.hook';
import { useGetAllProjects } from '@/core/hooks/query/admin-projects.hook';
import { useGetAllRequests } from '@/core/hooks/query/admin-requests.hook';
import { useGetAllUsers } from '@/core/hooks/query/admin-users.hook';

import LinesChart from './-components/LinesChart';
import StatusChart from './-components/StatusChart';

const Dashboard = () => {
    const { data: users } = useGetAllUsers();
    const { data: organizations } = useGetAllOrganizations();
    const { data: projects } = useGetAllProjects();
    const { data: posts } = useGetAllPosts();
    const { data: requests } = useGetAllRequests();

    return (
        <div className="space-y-3">
            <Typography.Title level={3}>Dashboard</Typography.Title>
            <div className="flex flex-col gap-2 bg-gray-100 px-4">
                <Typography.Title level={4}>Overview</Typography.Title>
                <div className="grid grid-cols-1 gap-2 pb-4 md:grid-cols-2 lg:grid-cols-5">
                    <ChartLabel color="green" label="Total users" value={users?.length || 0} precision={0} />
                    <ChartLabel color="blue" label="Total organizations" value={organizations?.length || 0} precision={0} />
                    <ChartLabel color="purple" label="Total projects" value={projects?.length || 0} precision={0} />
                    <ChartLabel color="orange" label="Total posts" value={posts?.length || 0} precision={0} />
                    <ChartLabel color="red" label="Total requests" value={requests?.length || 0} precision={0} />
                </div>
            </div>

            <LinesChart />
            <StatusChart />
        </div>
    );
};

export const Route = createFileRoute('/_admin-layout/dashboard/')({
    component: Dashboard,
});
