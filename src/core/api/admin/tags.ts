import { TagModel } from '@/core/models/tag';

import http from '../http';

const ENDPOINT = '/api/admin/tags';

export const tagsApi = {
    getAll: async () => {
        const response = await http.get<TagModel[]>(`${ENDPOINT}`);
        return response.data;
    },

    create: async (tag: TagModel) => {
        const response = await http.post(`${ENDPOINT}`, tag);
        return response.data;
    },

    update: async (tag: TagModel) => {
        const response = await http.put(`${ENDPOINT}/${tag.id}`, tag);
        return response.data;
    },

    delete: async (id: string) => {
        const response = await http.delete(`${ENDPOINT}/${id}`);
        return response.data;
    },
};
