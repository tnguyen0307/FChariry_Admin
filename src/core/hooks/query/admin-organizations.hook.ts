import React from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { PutRejectOrganizationDTO, adminOrganizationsApi } from '@/core/api/admin/organizations';
import { QUERY_CONSTANT } from '@/core/constant/query';
import { OrganizationStatus } from '@/core/models/organization';

export const useGetAllOrganizations = () => {
    return useQuery({
        queryKey: [QUERY_CONSTANT.ALL_ORGANIZATIONS],
        queryFn: adminOrganizationsApi.getAll,
    });
};

export const useGetOrganizationById = (id: string) => {
    return useQuery({
        queryKey: [QUERY_CONSTANT.ORGANIZATION, id],
        queryFn: () => adminOrganizationsApi.get(id),
    });
};

export const useActivateOrganization = () => {
    const queryClient = useQueryClient();
    const [id, setId] = React.useState<string | null>(null);

    return useMutation({
        mutationFn: (id: string) => {
            setId(id);

            return adminOrganizationsApi.activate(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ALL_ORGANIZATIONS],
            });

            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ORGANIZATION, id],
            });
        },
    });
};

export const useActivateAllOrganizations = () => {
    const queryClient = useQueryClient();
    const { data } = useGetAllOrganizations();
    return useMutation({
        mutationFn: async (_: null) => {
            const ids = data?.filter((item) => item.organizationStatus === OrganizationStatus.PENDING).map((item) => item.id);
            if (!ids) {
                return { success: false };
            }
            return await Promise.all(ids.map((id) => adminOrganizationsApi.activate(id)));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ALL_ORGANIZATIONS],
            });
        },
    });
};

export const useRejectOrganization = () => {
    const queryClient = useQueryClient();
    const [id, setId] = React.useState<string | null>(null);

    return useMutation({
        mutationFn: (data: PutRejectOrganizationDTO) => {
            setId(data.id);

            return adminOrganizationsApi.reject(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ALL_ORGANIZATIONS],
            });

            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ORGANIZATION, id],
            });
        },
    });
};

export const useBanOrganization = () => {
    const queryClient = useQueryClient();
    const [id, setId] = React.useState<string | null>(null);

    return useMutation({
        mutationFn: (id: string) => {
            setId(id);

            return adminOrganizationsApi.ban(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ALL_ORGANIZATIONS],
            });

            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ORGANIZATION, id],
            });
        },
    });
};

export const useUnbanOrganization = () => {
    const queryClient = useQueryClient();
    const [id, setId] = React.useState<string | null>(null);

    return useMutation({
        mutationFn: (id: string) => {
            setId(id);

            return adminOrganizationsApi.unban(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ALL_ORGANIZATIONS],
            });

            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ORGANIZATION, id],
            });
        },
    });
};
