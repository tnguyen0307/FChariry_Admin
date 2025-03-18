import React from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { adminProjectsApi } from '@/core/api/admin/projects';
import { QUERY_CONSTANT } from '@/core/constant/query';
import { ProjectStatus } from '@/core/models/project';

export const useGetAllProjects = () => {
    return useQuery({
        queryKey: [QUERY_CONSTANT.ALL_PROJECTS],
        queryFn: adminProjectsApi.getAll,
    });
};

export const useGetProjectById = (id: string) => {
    return useQuery({
        queryKey: [QUERY_CONSTANT.PROJECT, id],
        queryFn: () => adminProjectsApi.get(id),
    });
};

export const useApproveProject = () => {
    const queryClient = useQueryClient();
    const [id, setId] = React.useState<string | null>(null);

    return useMutation({
        mutationFn: (id: string) => {
            setId(id);

            return adminProjectsApi.approve(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ALL_PROJECTS],
            });

            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.PROJECT, id],
            });
        },
    });
};

export const useHideProject = () => {
    const queryClient = useQueryClient();
    const [id, setId] = React.useState<string | null>(null);

    return useMutation({
        mutationFn: (id: string) => {
            setId(id);

            return adminProjectsApi.hide(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ALL_PROJECTS],
            });

            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.PROJECT, id],
            });
        },
    });
};

export const useApproveAllProjects = () => {
    const queryClient = useQueryClient();
    const { data } = useGetAllProjects();
    return useMutation({
        mutationFn: async (_: null) => {
            const ids = data?.filter((item) => item.projectStatus === ProjectStatus.PENDING).map((item) => item.id);
            if (!ids) {
                return { success: false };
            }
            return await Promise.all(ids.map((id) => adminProjectsApi.approve(id)));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ALL_PROJECTS],
            });
        },
    });
};
