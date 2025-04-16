export const FCRouter = {
    index: () => '/',
    dashboard: {
        index: () => '/dashboard',
        users: {
            index: () => '/dashboard/users',
            detail: (id: string) => `/dashboard/users/${id}`,
        },
        organizations: {
            index: () => '/dashboard/organizations',
            detail: (id: string) => `/dashboard/organizations/${id}`,
        },
        projects: {
            index: () => '/dashboard/projects',
            detail: (id: string) => `/dashboard/projects/${id}`,
        },
        posts: {
            index: () => '/dashboard/posts',
            detail: (id: string) => `/dashboard/posts/${id}`,
        },
        requests: {
            index: () => '/dashboard/requests',
            detail: (id: string) => `/dashboard/requests/${id}`,
        },
        tags: {
            index: () => '/dashboard/tags',
            detail: (id: string) => `/dashboard/tags/${id}`,
        },
        transfers: {
            index: () => '/dashboard/transfers',
        },
    },
};
