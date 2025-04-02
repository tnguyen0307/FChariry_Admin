import { CurrentUserModel } from '../models/user';
import http from './http';

const ENDPOINT = '/users';

export const usersApi = {
    getCurrentUser: async () => {
        const res = await http.get<CurrentUserModel>(`${ENDPOINT}/my-profile`);

        return res?.data;
    },
};
