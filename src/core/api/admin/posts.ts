import { PostModel } from '@/core/models/post';

import http from '../http';

const ENDPOINT = '/api/admin/posts';

export type PutRejectPostDTO = {
    id: string;
} & Pick<PostModel, 'reason'>;

export const adminPostsApi = {
    getAll: async () => {
        const res = await http.get<PostModel[]>(`${ENDPOINT}`);

        return res?.data;
    },

    get: async (id: string) => {
        const res = await http.get<PostModel>(`${ENDPOINT}/${id}`);

        return res?.data;
    },

    activate: async (id: string) => {
        const res = await http.put(`${ENDPOINT}/activate/${id}`);

        return res?.data;
    },

    reject: async (data: PutRejectPostDTO) => {
        const { id, ...rest } = data;
        const res = await http.put(`${ENDPOINT}/reject/${id}`, rest);

        return res?.data;
    },

    ban: async (id: string) => {
        const res = await http.put(`${ENDPOINT}/ban/${id}`);

        return res?.data;
    },

    unban: async (id: string) => {
        const res = await http.put(`${ENDPOINT}/unban/${id}`);

        return res?.data;
    },
};
