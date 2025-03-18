import React from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { adminOrganizationsApi } from '@/core/api/admin/organizations';
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

export const useApproveOrganization = () => {
    const queryClient = useQueryClient();
    const [id, setId] = React.useState<string | null>(null);

    return useMutation({
        mutationFn: (id: string) => {
            setId(id);

            return adminOrganizationsApi.approve(id);
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

export const useHideOrganization = () => {
    const queryClient = useQueryClient();
    const [id, setId] = React.useState<string | null>(null);

    return useMutation({
        mutationFn: (id: string) => {
            setId(id);

            return adminOrganizationsApi.hide(id);
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

export const useApproveAllOrganizations = () => {
    const queryClient = useQueryClient();
    const { data } = useGetAllOrganizations();
    return useMutation({
        mutationFn: async (_: null) => {
            const ids = data?.filter((item) => item.organizationStatus === OrganizationStatus.PENDING).map((item) => item.id);
            if (!ids) {
                return { success: false };
            }
            return await Promise.all(ids.map((id) => adminOrganizationsApi.approve(id)));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ALL_ORGANIZATIONS],
            });
        },
    });
};
