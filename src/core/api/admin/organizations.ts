import { OrganizationModel } from '@/core/models/organization';

import http from '../http';

const ENDPOINT = '/api/admin/organizations';

export const adminOrganizationsApi = {
    getAll: async () => {
        const res = await http.get<OrganizationModel[]>(`${ENDPOINT}`);

        return res?.data;
    },

    get: async (id: string) => {
        const res = await http.get<OrganizationModel>(`${ENDPOINT}/${id}`);

        return res?.data;
    },

    activate: async (id: string) => {
        const res = await http.put(`${ENDPOINT}/activate/${id}`);

        return res?.data;
    },

    reject: async (id: string) => {
        const res = await http.put(`${ENDPOINT}/reject/${id}`);

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
