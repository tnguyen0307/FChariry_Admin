import { PostModel } from '@/core/models/post';

import http from '../http';

const ENDPOINT = '/api/admin/posts';

export const adminPostsApi = {
    getAll: async () => {
        const res = await http.get<PostModel[]>(`${ENDPOINT}`);

        return res?.data;
    },

    get: async (id: string) => {
        const res = await http.get<PostModel>(`${ENDPOINT}/${id}`);

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
