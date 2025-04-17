
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import 'react-photo-view/dist/react-photo-view.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';
import 'tippy.js/dist/tippy.css';

import { routeTree } from './routeTree.gen';
import { useEffect } from 'react';
import { connectWebSocket, disconnectWebSocket } from './core/socket/websocket';
import { connectOrganizationWebSocket, disconnectOrganizationWebSocket } from './core/socket/organizationwebsocket';
import { connectPostWebSocket, disconnectPostWebSocket } from './core/socket/postwebsocket';

const queryClient = new QueryClient();

// Register things for typesafety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

const router = createRouter({
    routeTree,
    context: {
        queryClient,
    },
    defaultPreload: 'intent',
    // Since we're using React Query, we don't want loader calls to ever be stale
    // This will ensure that the loader is always called when the route is preloaded or visited
    defaultPreloadStaleTime: 0,
});

function AppWrapper() {
    const location = window.location.pathname

    useEffect(() => {
        if (location !== '/login') {
            connectWebSocket((message: string) => {
                toast.info(message, {
                    position: 'bottom-right',
                    autoClose: 20000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            });
        }

        return () => {
            if (location !== '/login') {
                disconnectWebSocket();
            }
        };
    }, [location]);

    return (
    <>
            {location !== '/login' && <ToastContainer />}
        </>
    );
}
function PostAppWrapper() {
    const location = window.location.pathname

    useEffect(() => {
        if (location !== '/login') {
            connectPostWebSocket((message: string) => {
                toast.info(message, {
                    position: 'bottom-right',
                    autoClose: 20000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            });
        }

        return () => {
            if (location !== '/login') {
                disconnectPostWebSocket();
            }
        };
    }, [location]);

    return (
    <>
            {location !== '/login' && <ToastContainer />}
        </>
    );
}

function OrganizationAppWrapper() {
    const location = window.location.pathname

    useEffect(() => {
        if (location !== '/login') {
            connectOrganizationWebSocket((message: string) => {
                toast.info(message, {
                    position: 'bottom-right',
                    autoClose: 20000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            });
        }

        return () => {
            if (location !== '/login') {
                disconnectOrganizationWebSocket();
            }
        };
    }, [location]);

    return (
    <>
            {location !== '/login' && <ToastContainer />}
        </>
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <AppWrapper />
        <PostAppWrapper />
        <OrganizationAppWrapper/>
    </QueryClientProvider>,
);
