import React from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { adminPostsApi } from '@/core/api/admin/posts';
import { QUERY_CONSTANT } from '@/core/constant/query';
import { PostStatus } from '@/core/models/post';

export const useGetAllPosts = () => {
    return useQuery({
        queryKey: [QUERY_CONSTANT.ALL_POSTS],
        queryFn: adminPostsApi.getAll,
    });
};

export const useGetPostById = (id: string) => {
    return useQuery({
        queryKey: [QUERY_CONSTANT.POST, id],
        queryFn: () => adminPostsApi.get(id),
    });
};

export const useApprovePost = () => {
    const queryClient = useQueryClient();
    const [id, setId] = React.useState<string | null>(null);

    return useMutation({
        mutationFn: (id: string) => {
            setId(id);

            return adminPostsApi.approve(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ALL_POSTS],
            });

            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.POST, id],
            });
        },
    });
};

export const useHidePost = () => {
    const queryClient = useQueryClient();
    const [id, setId] = React.useState<string | null>(null);

    return useMutation({
        mutationFn: (id: string) => {
            setId(id);

            return adminPostsApi.hide(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ALL_POSTS],
            });

            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.POST, id],
            });
        },
    });
};

export const useApproveAllPosts = () => {
    const queryClient = useQueryClient();
    const { data } = useGetAllPosts();
    return useMutation({
        mutationFn: async (_: null) => {
            const ids = data?.filter((item) => item.postStatus === PostStatus.PENDING).map((item) => item.id);
            if (!ids) {
                return { success: false };
            }
            return await Promise.all(ids.map((id) => adminPostsApi.approve(id)));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ALL_POSTS],
            });
        },
    });
};
