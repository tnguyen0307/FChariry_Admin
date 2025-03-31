import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { adminUsersApi } from '@/core/api/admin/users';
import { QUERY_CONSTANT } from '@/core/constant/query';

export const useBanUserById = () => {
    const client = useQueryClient();
    return useMutation({
        mutationFn: adminUsersApi.banUserById,
        onSuccess: () => {
            client.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ALL_USERS],
            });
        },
    });
};

export const useUnBanUserById = () => {
    const client = useQueryClient();
    return useMutation({
        mutationFn: adminUsersApi.unBanUserById,
        onSuccess: () => {
            client.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ALL_USERS],
            });
        },
    });
};

export const useGetAllUsers = () => {
    return useQuery({
        queryKey: [QUERY_CONSTANT.ALL_USERS],
        queryFn: adminUsersApi.getAllUsers,
    });
};

export const useGetUserById = (id: string) => {
    return useQuery({
        queryKey: [QUERY_CONSTANT.USER, id],
        queryFn: () => adminUsersApi.getUserById(id),
    });
};
