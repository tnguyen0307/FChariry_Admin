
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';

import './index.css';
import 'react-photo-view/dist/react-photo-view.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';
import 'tippy.js/dist/tippy.css';

import { routeTree } from './routeTree.gen';

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



ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>,
);
