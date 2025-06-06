/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AdminLayoutImport } from './routes/_admin-layout'
import { Route as IndexImport } from './routes/index'
import { Route as AdminLayoutDashboardIndexImport } from './routes/_admin-layout.dashboard/index'
import { Route as AdminLayoutDashboardUsersIndexImport } from './routes/_admin-layout.dashboard/users/index'
import { Route as AdminLayoutDashboardTagsIndexImport } from './routes/_admin-layout.dashboard/tags/index'
import { Route as AdminLayoutDashboardRequestsIndexImport } from './routes/_admin-layout.dashboard/requests/index'
import { Route as AdminLayoutDashboardProjectsIndexImport } from './routes/_admin-layout.dashboard/projects/index'
import { Route as AdminLayoutDashboardPostsIndexImport } from './routes/_admin-layout.dashboard/posts/index'
import { Route as AdminLayoutDashboardOrganizationsIndexImport } from './routes/_admin-layout.dashboard/organizations/index'
import { Route as AdminLayoutDashboardUsersIdImport } from './routes/_admin-layout.dashboard/users/$id'
import { Route as AdminLayoutDashboardRequestsIdImport } from './routes/_admin-layout.dashboard/requests/$id'
import { Route as AdminLayoutDashboardProjectsIdImport } from './routes/_admin-layout.dashboard/projects/$id'
import { Route as AdminLayoutDashboardPostsIdImport } from './routes/_admin-layout.dashboard/posts/$id'
import { Route as AdminLayoutDashboardOrganizationsIdImport } from './routes/_admin-layout.dashboard/organizations/$id'

// Create/Update Routes

const AdminLayoutRoute = AdminLayoutImport.update({
  id: '/_admin-layout',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AdminLayoutDashboardIndexRoute = AdminLayoutDashboardIndexImport.update({
  id: '/dashboard/',
  path: '/dashboard/',
  getParentRoute: () => AdminLayoutRoute,
} as any)

const AdminLayoutDashboardUsersIndexRoute =
  AdminLayoutDashboardUsersIndexImport.update({
    id: '/dashboard/users/',
    path: '/dashboard/users/',
    getParentRoute: () => AdminLayoutRoute,
  } as any)

const AdminLayoutDashboardTagsIndexRoute =
  AdminLayoutDashboardTagsIndexImport.update({
    id: '/dashboard/tags/',
    path: '/dashboard/tags/',
    getParentRoute: () => AdminLayoutRoute,
  } as any)

const AdminLayoutDashboardRequestsIndexRoute =
  AdminLayoutDashboardRequestsIndexImport.update({
    id: '/dashboard/requests/',
    path: '/dashboard/requests/',
    getParentRoute: () => AdminLayoutRoute,
  } as any)

const AdminLayoutDashboardProjectsIndexRoute =
  AdminLayoutDashboardProjectsIndexImport.update({
    id: '/dashboard/projects/',
    path: '/dashboard/projects/',
    getParentRoute: () => AdminLayoutRoute,
  } as any)

const AdminLayoutDashboardPostsIndexRoute =
  AdminLayoutDashboardPostsIndexImport.update({
    id: '/dashboard/posts/',
    path: '/dashboard/posts/',
    getParentRoute: () => AdminLayoutRoute,
  } as any)

const AdminLayoutDashboardOrganizationsIndexRoute =
  AdminLayoutDashboardOrganizationsIndexImport.update({
    id: '/dashboard/organizations/',
    path: '/dashboard/organizations/',
    getParentRoute: () => AdminLayoutRoute,
  } as any)

const AdminLayoutDashboardUsersIdRoute =
  AdminLayoutDashboardUsersIdImport.update({
    id: '/dashboard/users/$id',
    path: '/dashboard/users/$id',
    getParentRoute: () => AdminLayoutRoute,
  } as any)

const AdminLayoutDashboardRequestsIdRoute =
  AdminLayoutDashboardRequestsIdImport.update({
    id: '/dashboard/requests/$id',
    path: '/dashboard/requests/$id',
    getParentRoute: () => AdminLayoutRoute,
  } as any)

const AdminLayoutDashboardProjectsIdRoute =
  AdminLayoutDashboardProjectsIdImport.update({
    id: '/dashboard/projects/$id',
    path: '/dashboard/projects/$id',
    getParentRoute: () => AdminLayoutRoute,
  } as any)

const AdminLayoutDashboardPostsIdRoute =
  AdminLayoutDashboardPostsIdImport.update({
    id: '/dashboard/posts/$id',
    path: '/dashboard/posts/$id',
    getParentRoute: () => AdminLayoutRoute,
  } as any)

const AdminLayoutDashboardOrganizationsIdRoute =
  AdminLayoutDashboardOrganizationsIdImport.update({
    id: '/dashboard/organizations/$id',
    path: '/dashboard/organizations/$id',
    getParentRoute: () => AdminLayoutRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_admin-layout': {
      id: '/_admin-layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AdminLayoutImport
      parentRoute: typeof rootRoute
    }
    '/_admin-layout/dashboard/': {
      id: '/_admin-layout/dashboard/'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AdminLayoutDashboardIndexImport
      parentRoute: typeof AdminLayoutImport
    }
    '/_admin-layout/dashboard/organizations/$id': {
      id: '/_admin-layout/dashboard/organizations/$id'
      path: '/dashboard/organizations/$id'
      fullPath: '/dashboard/organizations/$id'
      preLoaderRoute: typeof AdminLayoutDashboardOrganizationsIdImport
      parentRoute: typeof AdminLayoutImport
    }
    '/_admin-layout/dashboard/posts/$id': {
      id: '/_admin-layout/dashboard/posts/$id'
      path: '/dashboard/posts/$id'
      fullPath: '/dashboard/posts/$id'
      preLoaderRoute: typeof AdminLayoutDashboardPostsIdImport
      parentRoute: typeof AdminLayoutImport
    }
    '/_admin-layout/dashboard/projects/$id': {
      id: '/_admin-layout/dashboard/projects/$id'
      path: '/dashboard/projects/$id'
      fullPath: '/dashboard/projects/$id'
      preLoaderRoute: typeof AdminLayoutDashboardProjectsIdImport
      parentRoute: typeof AdminLayoutImport
    }
    '/_admin-layout/dashboard/requests/$id': {
      id: '/_admin-layout/dashboard/requests/$id'
      path: '/dashboard/requests/$id'
      fullPath: '/dashboard/requests/$id'
      preLoaderRoute: typeof AdminLayoutDashboardRequestsIdImport
      parentRoute: typeof AdminLayoutImport
    }
    '/_admin-layout/dashboard/users/$id': {
      id: '/_admin-layout/dashboard/users/$id'
      path: '/dashboard/users/$id'
      fullPath: '/dashboard/users/$id'
      preLoaderRoute: typeof AdminLayoutDashboardUsersIdImport
      parentRoute: typeof AdminLayoutImport
    }
    '/_admin-layout/dashboard/organizations/': {
      id: '/_admin-layout/dashboard/organizations/'
      path: '/dashboard/organizations'
      fullPath: '/dashboard/organizations'
      preLoaderRoute: typeof AdminLayoutDashboardOrganizationsIndexImport
      parentRoute: typeof AdminLayoutImport
    }
    '/_admin-layout/dashboard/posts/': {
      id: '/_admin-layout/dashboard/posts/'
      path: '/dashboard/posts'
      fullPath: '/dashboard/posts'
      preLoaderRoute: typeof AdminLayoutDashboardPostsIndexImport
      parentRoute: typeof AdminLayoutImport
    }
    '/_admin-layout/dashboard/projects/': {
      id: '/_admin-layout/dashboard/projects/'
      path: '/dashboard/projects'
      fullPath: '/dashboard/projects'
      preLoaderRoute: typeof AdminLayoutDashboardProjectsIndexImport
      parentRoute: typeof AdminLayoutImport
    }
    '/_admin-layout/dashboard/requests/': {
      id: '/_admin-layout/dashboard/requests/'
      path: '/dashboard/requests'
      fullPath: '/dashboard/requests'
      preLoaderRoute: typeof AdminLayoutDashboardRequestsIndexImport
      parentRoute: typeof AdminLayoutImport
    }
    '/_admin-layout/dashboard/tags/': {
      id: '/_admin-layout/dashboard/tags/'
      path: '/dashboard/tags'
      fullPath: '/dashboard/tags'
      preLoaderRoute: typeof AdminLayoutDashboardTagsIndexImport
      parentRoute: typeof AdminLayoutImport
    }
    '/_admin-layout/dashboard/users/': {
      id: '/_admin-layout/dashboard/users/'
      path: '/dashboard/users'
      fullPath: '/dashboard/users'
      preLoaderRoute: typeof AdminLayoutDashboardUsersIndexImport
      parentRoute: typeof AdminLayoutImport
    }
  }
}

// Create and export the route tree

interface AdminLayoutRouteChildren {
  AdminLayoutDashboardIndexRoute: typeof AdminLayoutDashboardIndexRoute
  AdminLayoutDashboardOrganizationsIdRoute: typeof AdminLayoutDashboardOrganizationsIdRoute
  AdminLayoutDashboardPostsIdRoute: typeof AdminLayoutDashboardPostsIdRoute
  AdminLayoutDashboardProjectsIdRoute: typeof AdminLayoutDashboardProjectsIdRoute
  AdminLayoutDashboardRequestsIdRoute: typeof AdminLayoutDashboardRequestsIdRoute
  AdminLayoutDashboardUsersIdRoute: typeof AdminLayoutDashboardUsersIdRoute
  AdminLayoutDashboardOrganizationsIndexRoute: typeof AdminLayoutDashboardOrganizationsIndexRoute
  AdminLayoutDashboardPostsIndexRoute: typeof AdminLayoutDashboardPostsIndexRoute
  AdminLayoutDashboardProjectsIndexRoute: typeof AdminLayoutDashboardProjectsIndexRoute
  AdminLayoutDashboardRequestsIndexRoute: typeof AdminLayoutDashboardRequestsIndexRoute
  AdminLayoutDashboardTagsIndexRoute: typeof AdminLayoutDashboardTagsIndexRoute
  AdminLayoutDashboardUsersIndexRoute: typeof AdminLayoutDashboardUsersIndexRoute
}

const AdminLayoutRouteChildren: AdminLayoutRouteChildren = {
  AdminLayoutDashboardIndexRoute: AdminLayoutDashboardIndexRoute,
  AdminLayoutDashboardOrganizationsIdRoute:
    AdminLayoutDashboardOrganizationsIdRoute,
  AdminLayoutDashboardPostsIdRoute: AdminLayoutDashboardPostsIdRoute,
  AdminLayoutDashboardProjectsIdRoute: AdminLayoutDashboardProjectsIdRoute,
  AdminLayoutDashboardRequestsIdRoute: AdminLayoutDashboardRequestsIdRoute,
  AdminLayoutDashboardUsersIdRoute: AdminLayoutDashboardUsersIdRoute,
  AdminLayoutDashboardOrganizationsIndexRoute:
    AdminLayoutDashboardOrganizationsIndexRoute,
  AdminLayoutDashboardPostsIndexRoute: AdminLayoutDashboardPostsIndexRoute,
  AdminLayoutDashboardProjectsIndexRoute:
    AdminLayoutDashboardProjectsIndexRoute,
  AdminLayoutDashboardRequestsIndexRoute:
    AdminLayoutDashboardRequestsIndexRoute,
  AdminLayoutDashboardTagsIndexRoute: AdminLayoutDashboardTagsIndexRoute,
  AdminLayoutDashboardUsersIndexRoute: AdminLayoutDashboardUsersIndexRoute,
}

const AdminLayoutRouteWithChildren = AdminLayoutRoute._addFileChildren(
  AdminLayoutRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AdminLayoutRouteWithChildren
  '/dashboard': typeof AdminLayoutDashboardIndexRoute
  '/dashboard/organizations/$id': typeof AdminLayoutDashboardOrganizationsIdRoute
  '/dashboard/posts/$id': typeof AdminLayoutDashboardPostsIdRoute
  '/dashboard/projects/$id': typeof AdminLayoutDashboardProjectsIdRoute
  '/dashboard/requests/$id': typeof AdminLayoutDashboardRequestsIdRoute
  '/dashboard/users/$id': typeof AdminLayoutDashboardUsersIdRoute
  '/dashboard/organizations': typeof AdminLayoutDashboardOrganizationsIndexRoute
  '/dashboard/posts': typeof AdminLayoutDashboardPostsIndexRoute
  '/dashboard/projects': typeof AdminLayoutDashboardProjectsIndexRoute
  '/dashboard/requests': typeof AdminLayoutDashboardRequestsIndexRoute
  '/dashboard/tags': typeof AdminLayoutDashboardTagsIndexRoute
  '/dashboard/users': typeof AdminLayoutDashboardUsersIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AdminLayoutRouteWithChildren
  '/dashboard': typeof AdminLayoutDashboardIndexRoute
  '/dashboard/organizations/$id': typeof AdminLayoutDashboardOrganizationsIdRoute
  '/dashboard/posts/$id': typeof AdminLayoutDashboardPostsIdRoute
  '/dashboard/projects/$id': typeof AdminLayoutDashboardProjectsIdRoute
  '/dashboard/requests/$id': typeof AdminLayoutDashboardRequestsIdRoute
  '/dashboard/users/$id': typeof AdminLayoutDashboardUsersIdRoute
  '/dashboard/organizations': typeof AdminLayoutDashboardOrganizationsIndexRoute
  '/dashboard/posts': typeof AdminLayoutDashboardPostsIndexRoute
  '/dashboard/projects': typeof AdminLayoutDashboardProjectsIndexRoute
  '/dashboard/requests': typeof AdminLayoutDashboardRequestsIndexRoute
  '/dashboard/tags': typeof AdminLayoutDashboardTagsIndexRoute
  '/dashboard/users': typeof AdminLayoutDashboardUsersIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_admin-layout': typeof AdminLayoutRouteWithChildren
  '/_admin-layout/dashboard/': typeof AdminLayoutDashboardIndexRoute
  '/_admin-layout/dashboard/organizations/$id': typeof AdminLayoutDashboardOrganizationsIdRoute
  '/_admin-layout/dashboard/posts/$id': typeof AdminLayoutDashboardPostsIdRoute
  '/_admin-layout/dashboard/projects/$id': typeof AdminLayoutDashboardProjectsIdRoute
  '/_admin-layout/dashboard/requests/$id': typeof AdminLayoutDashboardRequestsIdRoute
  '/_admin-layout/dashboard/users/$id': typeof AdminLayoutDashboardUsersIdRoute
  '/_admin-layout/dashboard/organizations/': typeof AdminLayoutDashboardOrganizationsIndexRoute
  '/_admin-layout/dashboard/posts/': typeof AdminLayoutDashboardPostsIndexRoute
  '/_admin-layout/dashboard/projects/': typeof AdminLayoutDashboardProjectsIndexRoute
  '/_admin-layout/dashboard/requests/': typeof AdminLayoutDashboardRequestsIndexRoute
  '/_admin-layout/dashboard/tags/': typeof AdminLayoutDashboardTagsIndexRoute
  '/_admin-layout/dashboard/users/': typeof AdminLayoutDashboardUsersIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/dashboard'
    | '/dashboard/organizations/$id'
    | '/dashboard/posts/$id'
    | '/dashboard/projects/$id'
    | '/dashboard/requests/$id'
    | '/dashboard/users/$id'
    | '/dashboard/organizations'
    | '/dashboard/posts'
    | '/dashboard/projects'
    | '/dashboard/requests'
    | '/dashboard/tags'
    | '/dashboard/users'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/dashboard'
    | '/dashboard/organizations/$id'
    | '/dashboard/posts/$id'
    | '/dashboard/projects/$id'
    | '/dashboard/requests/$id'
    | '/dashboard/users/$id'
    | '/dashboard/organizations'
    | '/dashboard/posts'
    | '/dashboard/projects'
    | '/dashboard/requests'
    | '/dashboard/tags'
    | '/dashboard/users'
  id:
    | '__root__'
    | '/'
    | '/_admin-layout'
    | '/_admin-layout/dashboard/'
    | '/_admin-layout/dashboard/organizations/$id'
    | '/_admin-layout/dashboard/posts/$id'
    | '/_admin-layout/dashboard/projects/$id'
    | '/_admin-layout/dashboard/requests/$id'
    | '/_admin-layout/dashboard/users/$id'
    | '/_admin-layout/dashboard/organizations/'
    | '/_admin-layout/dashboard/posts/'
    | '/_admin-layout/dashboard/projects/'
    | '/_admin-layout/dashboard/requests/'
    | '/_admin-layout/dashboard/tags/'
    | '/_admin-layout/dashboard/users/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AdminLayoutRoute: typeof AdminLayoutRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AdminLayoutRoute: AdminLayoutRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_admin-layout"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_admin-layout": {
      "filePath": "_admin-layout.tsx",
      "children": [
        "/_admin-layout/dashboard/",
        "/_admin-layout/dashboard/organizations/$id",
        "/_admin-layout/dashboard/posts/$id",
        "/_admin-layout/dashboard/projects/$id",
        "/_admin-layout/dashboard/requests/$id",
        "/_admin-layout/dashboard/users/$id",
        "/_admin-layout/dashboard/organizations/",
        "/_admin-layout/dashboard/posts/",
        "/_admin-layout/dashboard/projects/",
        "/_admin-layout/dashboard/requests/",
        "/_admin-layout/dashboard/tags/",
        "/_admin-layout/dashboard/users/"
      ]
    },
    "/_admin-layout/dashboard/": {
      "filePath": "_admin-layout.dashboard/index.tsx",
      "parent": "/_admin-layout"
    },
    "/_admin-layout/dashboard/organizations/$id": {
      "filePath": "_admin-layout.dashboard/organizations/$id.tsx",
      "parent": "/_admin-layout"
    },
    "/_admin-layout/dashboard/posts/$id": {
      "filePath": "_admin-layout.dashboard/posts/$id.tsx",
      "parent": "/_admin-layout"
    },
    "/_admin-layout/dashboard/projects/$id": {
      "filePath": "_admin-layout.dashboard/projects/$id.tsx",
      "parent": "/_admin-layout"
    },
    "/_admin-layout/dashboard/requests/$id": {
      "filePath": "_admin-layout.dashboard/requests/$id.tsx",
      "parent": "/_admin-layout"
    },
    "/_admin-layout/dashboard/users/$id": {
      "filePath": "_admin-layout.dashboard/users/$id.tsx",
      "parent": "/_admin-layout"
    },
    "/_admin-layout/dashboard/organizations/": {
      "filePath": "_admin-layout.dashboard/organizations/index.tsx",
      "parent": "/_admin-layout"
    },
    "/_admin-layout/dashboard/posts/": {
      "filePath": "_admin-layout.dashboard/posts/index.tsx",
      "parent": "/_admin-layout"
    },
    "/_admin-layout/dashboard/projects/": {
      "filePath": "_admin-layout.dashboard/projects/index.tsx",
      "parent": "/_admin-layout"
    },
    "/_admin-layout/dashboard/requests/": {
      "filePath": "_admin-layout.dashboard/requests/index.tsx",
      "parent": "/_admin-layout"
    },
    "/_admin-layout/dashboard/tags/": {
      "filePath": "_admin-layout.dashboard/tags/index.tsx",
      "parent": "/_admin-layout"
    },
    "/_admin-layout/dashboard/users/": {
      "filePath": "_admin-layout.dashboard/users/index.tsx",
      "parent": "/_admin-layout"
    }
  }
}
ROUTE_MANIFEST_END */
