import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { tagsApi } from '@/core/api/admin/tags';
import { QUERY_CONSTANT } from '@/core/constant/query';
import { TagModel } from '@/core/models/tag';

export const useAllTags = () => {
    return useQuery({
        queryKey: [QUERY_CONSTANT.ALL_TAGS],
        queryFn: () => tagsApi.getAll(),
    });
};

export const useCreateTag = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (tag: TagModel) => tagsApi.create(tag),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ALL_TAGS],
            });
        },
    });
};

export const useUpdateTag = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (tag: TagModel) => tagsApi.update(tag),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ALL_TAGS],
            });
        },
    });
};

export const useDeleteTag = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => tagsApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ALL_TAGS],
            });
        },
    });
};
