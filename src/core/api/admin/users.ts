import { UserModel } from '@/core/models/user';

import http from '../http';

const ENDPOINT = '/api/admin/users';

export type PutBanUserDTO = {
    id: string;
} & Pick<UserModel, 'reason'>;

export const adminUsersApi = {
    getAllUsers: async () => {
        const res = await http.get<UserModel[]>(`${ENDPOINT}`);

        return res?.data;
    },

    banUserById: async (data: PutBanUserDTO) => {
        const { id, ...rest } = data;
        const res = await http.put(`${ENDPOINT}/ban/${id}`, rest);

        return res?.data;
    },

    unBanUserById: async (id: string) => {
        const res = await http.put(`${ENDPOINT}/unban/${id}`);

        return res?.data;
    },

    getUserById: async (id: string) => {
        const res = await http.get<UserModel>(`${ENDPOINT}/${id}`);

        return res?.data;
    },
};
