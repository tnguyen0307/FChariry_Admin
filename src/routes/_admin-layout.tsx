import * as React from 'react';

import { Outlet, createFileRoute, redirect } from '@tanstack/react-router';
import Cookies from 'universal-cookie';

import { NKConstant } from '@/core/NKConstant';
import { authApi } from '@/core/api/auth';
import DashboardLayout from '@/core/components/layout/DashboardLayout';
import { isValidToken } from '@/core/utils/token';

interface LayoutProps {}

const Layout: React.FunctionComponent<LayoutProps> = () => {
    return (
        <>
            <DashboardLayout>
                <Outlet />
            </DashboardLayout>
        </>
    );
};

export const Route = createFileRoute('/_admin-layout')({
    component: Layout,
    async beforeLoad() {
        const cookies = new Cookies();
        const token = cookies.get(NKConstant.TOKEN_COOKIE_KEY);
        const refreshToken = cookies.get(NKConstant.REFRESH_TOKEN_COOKIE_KEY);

        if (!isValidToken(token)) {
            cookies.remove(NKConstant.TOKEN_COOKIE_KEY);

            if (refreshToken) {
                authApi.refreshToken();
                return;
            }

            throw redirect({
                to: '/',
            });
        }
    },
});
