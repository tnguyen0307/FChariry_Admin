import React from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { PutRejectPostDTO, adminPostsApi } from '@/core/api/admin/posts';
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

export const useActivatePost = () => {
    const queryClient = useQueryClient();
    const [id, setId] = React.useState<string | null>(null);

    return useMutation({
        mutationFn: (id: string) => {
            setId(id);

            return adminPostsApi.activate(id);
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

export const useActivateAllPosts = () => {
    const queryClient = useQueryClient();
    const { data } = useGetAllPosts();
    return useMutation({
        mutationFn: async (_: null) => {
            const ids = data?.filter((item) => item.postStatus === PostStatus.PENDING).map((item) => item.id);
            if (!ids) {
                return { success: false };
            }
            return await Promise.all(ids.map((id) => adminPostsApi.activate(id)));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ALL_POSTS],
            });
        },
    });
};

export const useRejectPost = () => {
    const queryClient = useQueryClient();
    const [id, setId] = React.useState<string | null>(null);

    return useMutation({
        mutationFn: (data: PutRejectPostDTO) => {
            setId(data.id);

            return adminPostsApi.reject(data);
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

export const useBanPost = () => {
    const queryClient = useQueryClient();
    const [id, setId] = React.useState<string | null>(null);

    return useMutation({
        mutationFn: (id: string) => {
            setId(id);

            return adminPostsApi.ban(id);
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

export const useUnbanPost = () => {
    const queryClient = useQueryClient();
    const [id, setId] = React.useState<string | null>(null);

    return useMutation({
        mutationFn: (id: string) => {
            setId(id);

            return adminPostsApi.unban(id);
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
