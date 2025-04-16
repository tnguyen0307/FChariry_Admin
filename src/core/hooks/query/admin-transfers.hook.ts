import React from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { transferRequestsApi } from '@/core/api/admin/transferRequests';
import { QUERY_CONSTANT } from '@/core/constant/query';

export const useGetAllTransfers = () => {
    return useQuery({
        queryKey: [QUERY_CONSTANT.ALL_TRANSFERS],
        queryFn: transferRequestsApi.getAll,
    });
};

export const useUpdateTransactionImage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, transactionImage,note }: { id: string; transactionImage: string ,note:string}) =>
            transferRequestsApi.updateTransactionImage({ id, transactionImage,note }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ALL_TRANSFERS],
            });
        },
    });
};
export const useUpdateTransactionError = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, note }: { id: string; note: string }) =>
            transferRequestsApi.updateTransactionError({ id, note }),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_CONSTANT.ALL_TRANSFERS],
            });
        },
    });
};
// export const useBanProject = () => {
//     const queryClient = useQueryClient();
//     const [id, setId] = React.useState<string | null>(null);

//     return useMutation({
//         mutationFn: (id: string) => {
//             setId(id);

//             return adminProjectsApi.ban(id);
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries({
//                 queryKey: [QUERY_CONSTANT.ALL_PROJECTS],
//             });

//             queryClient.invalidateQueries({
//                 queryKey: [QUERY_CONSTANT.PROJECT, id],
//             });
//         },
//     });
// };
