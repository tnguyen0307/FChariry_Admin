import React from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { adminRequestsApi } from '@/core/api/admin/requests';
import { QUERY_CONSTANT } from '@/core/constant/query';
import { RequestStatus } from '@/core/models/request';

export const useGetAllRequests = () => {
    return useQuery({
        queryKey: [QUERY_CONSTANT.ALL_REQUESTS],
        queryFn: adminRequestsApi.getAll,
    });
};

export const useGetRequestById = (id: string) => {
    return useQuery({
        queryKey: [QUERY_CONSTANT.REQUEST, id],
        queryFn: () => adminRequestsApi.get(id),
    });
};

export const useApproveRequest = () => {
    const queryClient = useQueryClient();
    const [id, setId] = React.useState<string | null>(null);

    return useMutation({
        mutationFn: (id: string) => {
            setId(id);

            return adminRequestsApi.approve(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ALL_REQUESTS],
            });

            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.REQUEST, id],
            });
        },
    });
};

export const useRejectRequest = () => {
    const queryClient = useQueryClient();
    const [id, setId] = React.useState<string | null>(null);

    return useMutation({
        mutationFn: (id: string) => {
            setId(id);

            return adminRequestsApi.reject(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ALL_REQUESTS],
            });

            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.REQUEST, id],
            });
        },
    });
};

export const useApproveAllRequests = () => {
    const queryClient = useQueryClient();
    const { data } = useGetAllRequests();
    return useMutation({
        mutationFn: async (_: null) => {
            const ids = data?.filter((item) => item.status === RequestStatus.PENDING).map((item) => item.id);
            if (!ids) {
                return { success: false };
            }
            return await Promise.all(ids.map((id) => adminRequestsApi.approve(id)));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ALL_REQUESTS],
            });
        },
    });
};
