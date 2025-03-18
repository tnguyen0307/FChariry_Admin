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

    approve: async (id: string) => {
        const res = await http.put(`${ENDPOINT}/approve/${id}`);

        return res?.data;
    },

    hide: async (id: string) => {
        const res = await http.put(`${ENDPOINT}/hide/${id}`);

        return res?.data;
    },
};
