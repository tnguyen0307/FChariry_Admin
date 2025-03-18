import { RequestModel } from '@/core/models/request';

import http from '../http';

const ENDPOINT = '/api/admin/requests';

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

    hide: async (id: string) => {
        const res = await http.put(`${ENDPOINT}/hide/${id}`);

        return res?.data;
    },
};
