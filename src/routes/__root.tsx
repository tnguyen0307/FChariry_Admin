import * as React from 'react';

import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Cookies, CookiesProvider } from 'react-cookie';

import ThemeProvider from '@/core/components/common/ThemeProvider';
import { AuthProvider } from '@/core/contexts/AuthContext';
import { Providers } from '@/core/store/provider';

import '../index.css';
import 'react-toastify/dist/ReactToastify.css';

const TanStackRouterDevtools = import.meta.env.PROD
    ? () => null
    : React.lazy(() =>
          import('@tanstack/router-devtools').then((m) => ({
              default: m.TanStackRouterDevtools,
          })),
      );

interface RootLayoutProps {}

const RootLayout: React.FunctionComponent<RootLayoutProps> = () => {
    return (
        <CookiesProvider>
            <Providers>
                <AuthProvider>
                    <ThemeProvider locale={''}>
                        <Outlet />
                    </ThemeProvider>
                </AuthProvider>
            </Providers>
        </CookiesProvider>
    );
};

export const Route = createRootRoute({
    component: RootLayout,
});
