import { createFileRoute, redirect } from '@tanstack/react-router';

const Dashboard = () => {
    return <div className="space-y-8">Analytics</div>;
};

export const Route = createFileRoute('/_admin-layout/dashboard/')({
    component: Dashboard,
    beforeLoad: () => {
        throw redirect({
            to: '/dashboard/users',
        });
    },
});
