import React from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { adminProjectsApi } from '@/core/api/admin/projects';
import { QUERY_CONSTANT } from '@/core/constant/query';

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

export const useBanProject = () => {
    const queryClient = useQueryClient();
    const [id, setId] = React.useState<string | null>(null);

    return useMutation({
        mutationFn: (id: string) => {
            setId(id);

            return adminProjectsApi.ban(id);
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
