import { ProjectModel } from '@/core/models/project';

import http from '../http';

const ENDPOINT = '/api/admin/projects';

export const adminProjectsApi = {
    getAll: async () => {
        const res = await http.get<ProjectModel[]>(`${ENDPOINT}`);

        return res?.data;
    },

    get: async (id: string) => {
        const res = await http.get<ProjectModel>(`${ENDPOINT}/${id}`);

        return res?.data;
    },

    // approve: async (id: string) => {
    //     const res = await http.put(`${ENDPOINT}/approve/${id}`);

    //     return res?.data;
    // },

    ban: async (id: string) => {
        const res = await http.put(`${ENDPOINT}/ban/${id}`);

        return res?.data;
    },
};
