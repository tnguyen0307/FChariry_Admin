'use client';

import React from 'react';

import { ArrowRepeat, PointerDownFill, Receipt } from 'akar-icons';
import { Button, Layout, Menu } from 'antd';
import { Building, User } from 'lucide-react';

import { FCRouter } from '@/core/FCRouter';
import { useAuth } from '@/core/contexts/AuthContext';
import { useFCRouter } from '@/core/routing/hooks/FCRouter';

const { Content, Sider } = Layout;

interface DashboardLayoutProps extends React.PropsWithChildren {}

const DashboardLayout: React.FunctionComponent<DashboardLayoutProps> = ({ children }) => {
    const router = useFCRouter();

    const { logout } = useAuth();

    return (
        <Layout className="fade-in !min-h-screen min-w-full overflow-auto sm:min-w-[900px]">
            <Layout>
                <Sider
                    collapsed={false}
                    width={250}
                    collapsedWidth={80}
                    className="relative border-0 border-r border-solid !border-black !bg-white "
                >
                    <div className="flex h-full flex-col justify-between">
                        <div className="">
                            <div className="w-full items-center justify-center">
                                <div className="relative flex  flex-col items-center gap-2 p-2">
                                    <img src="/logo.svg" className="h-20" />
                                </div>
                            </div>

                            <Menu
                                mode="inline"
                                className="h-fit border-r-0"
                                items={[
                                    {
                                        key: 'users',
                                        icon: <User className="h-4 w-4" />,
                                        label: 'Users',
                                        onClick: () => router.push(FCRouter.dashboard.users.index()),
                                    },
                                    {
                                        key: 'organizations',
                                        icon: <Building className="h-4 w-4" />,
                                        label: 'Organizations',
                                        onClick: () => router.push(FCRouter.dashboard.organizations.index()),
                                    },
                                    {
                                        key: 'projects',
                                        icon: <PointerDownFill className="h-4 w-4" />,
                                        label: 'Projects',
                                        onClick: () => router.push(FCRouter.dashboard.projects.index()),
                                    },
                                    {
                                        key: 'posts',
                                        icon: <Receipt className="h-4 w-4" />,
                                        label: 'Posts',
                                        onClick: () => router.push(FCRouter.dashboard.posts.index()),
                                    },
                                    {
                                        key: 'requests',
                                        icon: <ArrowRepeat className="h-4 w-4" />,
                                        label: 'Requests',
                                        onClick: () => router.push(FCRouter.dashboard.requests.index()),
                                    },
                                ]}
                            />
                        </div>
                        <div className="h-8">
                            <Button className="w-full flex-shrink-0" type="primary" danger onClick={() => logout()}>
                                Sign out
                            </Button>
                        </div>
                    </div>
                </Sider>
                <Layout className="">
                    <Content className="m-0 min-h-[280px] bg-white p-4">{children}</Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
