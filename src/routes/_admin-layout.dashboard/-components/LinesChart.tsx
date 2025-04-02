import * as React from 'react';

import { DatePicker, Typography } from 'antd';
import dayjs from 'dayjs';
import _ from 'lodash';
import moment from 'moment';

import ChartBasicArea from '@/core/components/chart/ChartBasicArea';
import { useGetAllOrganizations } from '@/core/hooks/query/admin-organizations.hook';
import { useGetAllPosts } from '@/core/hooks/query/admin-posts.hook';
import { useGetAllProjects } from '@/core/hooks/query/admin-projects.hook';
import { useGetAllRequests } from '@/core/hooks/query/admin-requests.hook';
import { useGetAllUsers } from '@/core/hooks/query/admin-users.hook';

interface LinesChartProps {}
const LinesChart: React.FunctionComponent<LinesChartProps> = () => {
    const { data: users } = useGetAllUsers();
    const { data: organizations } = useGetAllOrganizations();
    const { data: posts } = useGetAllPosts();
    const { data: requests } = useGetAllRequests();
    const [dateRange, setDateRange] = React.useState<[string, string]>([
        moment().subtract(1, 'month').format('YYYY-MM-DD'),
        moment().format('YYYY-MM-DD'),
    ]);

    const usersLineChartValues = React.useMemo(() => {
        const filteredData = users
            ?.filter((user) => {
                return dayjs(user.createdDate).isAfter(dayjs(dateRange[0])) && dayjs(user.createdDate).isBefore(dayjs(dateRange[1]));
            })
            .sort((a, b) => {
                return dayjs(a.createdDate).valueOf() - dayjs(b.createdDate).valueOf();
            });

        const data = _.groupBy(filteredData, 'createdDate');

        return Object.keys(data).map((key) => {
            return {
                name: moment(key).format('DD/MM/YYYY'),
                data: data[key].length,
            };
        });
    }, [users, dateRange]);

    const organizationsLineChartValues = React.useMemo(() => {
        const filteredData = organizations
            ?.filter((organization) => {
                return dayjs(organization.startTime).isAfter(dayjs(dateRange[0])) && dayjs(organization.startTime).isBefore(dayjs(dateRange[1]));
            })
            .sort((a, b) => {
                return dayjs(a.startTime).valueOf() - dayjs(b.startTime).valueOf();
            });

        const data = _.groupBy(filteredData, 'startTime');

        return Object.keys(data).map((key) => {
            return { name: moment(key).format('DD/MM/YYYY'), data: data[key].length };
        });
    }, [organizations, dateRange]);

    const requestsLineChartValues = React.useMemo(() => {
        const filteredData = requests
            ?.filter((request) => {
                return dayjs(request.creationDate).isAfter(dayjs(dateRange[0])) && dayjs(request.creationDate).isBefore(dayjs(dateRange[1]));
            })
            .sort((a, b) => {
                return dayjs(a.creationDate).valueOf() - dayjs(b.creationDate).valueOf();
            });

        const data = _.groupBy(filteredData, 'creationDate');

        return Object.keys(data).map((key) => {
            return { name: moment(key).format('DD/MM/YYYY'), data: data[key].length };
        });
    }, [requests, dateRange]);

    const postsLineChartValues = React.useMemo(() => {
        const filteredData = posts
            ?.filter((post) => {
                return dayjs(post.createdAt).isAfter(dayjs(dateRange[0])) && dayjs(post.createdAt).isBefore(dayjs(dateRange[1]));
            })
            .sort((a, b) => {
                return dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf();
            });

        const data = _.groupBy(filteredData, 'createdAt');

        return Object.keys(data).map((key) => {
            return { name: moment(key).format('DD/MM/YYYY'), data: data[key].length };
        });
    }, [posts, dateRange]);

    return (
        <div className="flex flex-col gap-2 bg-gray-100 p-4">
            <div className="flex w-full justify-between gap-2">
                <Typography.Title level={4} className="m-0">
                    Line chart
                </Typography.Title>
                <DatePicker.RangePicker
                    size="small"
                    defaultValue={[dayjs(dateRange[0]), dayjs(dateRange[1])]}
                    onChange={(dates) => setDateRange([dates?.[0]?.format('YYYY-MM-DD') || '', dates?.[1]?.format('YYYY-MM-DD') || ''])}
                    allowClear={false}
                />
            </div>
            <div className="grid grid-cols-2 gap-2 pb-4">
                <ChartBasicArea title="Users created" values={usersLineChartValues} unit="users" colors={['#008000']} />
                <ChartBasicArea title="Organizations started" values={organizationsLineChartValues} unit="organizations" colors={['#00f']} />
                <ChartBasicArea title="Requests created" values={requestsLineChartValues} unit="requests" colors={['#ffa500']} />
                <ChartBasicArea title="Posts created" values={postsLineChartValues} unit="posts" colors={['#f00']} />
            </div>
        </div>
    );
};

export default LinesChart;
