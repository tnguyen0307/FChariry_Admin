import { RequestModel } from '@/core/models/request';

import http from '../http';

const ENDPOINT = '/api/admin/requests';

export type PutRejectRequestDTO = {
    id: string;
} & Pick<RequestModel, 'reason'>;

export const adminRequestsApi = {
    getAll: async () => {
        const res = await http.get<RequestModel[]>(`${ENDPOINT}`);

        return res?.data;
    },

    get: async (id: string) => {
        const res = await http.get<RequestModel>(`${ENDPOINT}/${id}`);

        return res?.data;
    },

    approve: async (id: string) => {
        const res = await http.put(`${ENDPOINT}/approve/${id}`);

        return res?.data;
    },

    reject: async (data: PutRejectRequestDTO) => {
        const { id, ...rest } = data;
        const res = await http.put(`${ENDPOINT}/reject/${id}`, rest);

        return res?.data;
    },
};
