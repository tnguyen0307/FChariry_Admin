import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { UpdateTransactionErrorParams, UpdateTransactionImageParams, withdrawRequestsApi } from '@/core/api/admin/withdrawRequests';
import { QUERY_CONSTANT } from '@/core/constant/query';

export const useGetAllWithdraws = () => {
    return useQuery({
        queryKey: [QUERY_CONSTANT.ALL_WITHDRAWALS],
        queryFn: withdrawRequestsApi.getAll,
    });
};

export const useWithdrawUpdateTransactionImage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateTransactionImageParams) => withdrawRequestsApi.updateTransactionImage(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ALL_WITHDRAWALS],
            });
        },
    });
};
export const useWithdrawUpdateTransactionError = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateTransactionErrorParams) => withdrawRequestsApi.updateTransactionError(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ALL_WITHDRAWALS],
            });
        },
    });
};
