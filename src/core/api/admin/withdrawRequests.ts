import { WithdrawRequestModel } from '@/core/models/withdrawRequest';

import http from '../http';

const ENDPOINT = '/withdraw-requests';

export type UpdateTransactionImageParams = {
    id: string;
    transactionImage: string;
    note: string;
};

export type UpdateTransactionErrorParams = {
    id: string;
    note: string;
};

export const withdrawRequestsApi = {
    getAll: async () => {
        const response = await http.get<WithdrawRequestModel[]>(`${ENDPOINT}`);
        return response.data;
    },

    // create: async (tag: TagModel) => {
    //     const response = await http.post(`${ENDPOINT}`, tag);
    //     return response.data;
    // },

    updateTransactionImage: async ({ id, transactionImage, note }: UpdateTransactionImageParams) => {
        const response = await http.put(`${ENDPOINT}/${id}/update-transaction-image`, null, {
            params: {
                transactionImage: transactionImage,
                note: note,
            },
        });
        return response.data;
    },

    updateTransactionError: async ({ id, note }: UpdateTransactionErrorParams) => {
        const response = await http.put(`${ENDPOINT}/${id}/update-error`, null, {
            params: {
                note: note,
            },
        });
        return response.data;
    },

    delete: async (id: string) => {
        const response = await http.delete(`${ENDPOINT}/${id}`);
        return response.data;
    },
};
