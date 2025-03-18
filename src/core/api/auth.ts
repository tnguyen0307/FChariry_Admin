import Cookies from 'universal-cookie';

import { NKConstant } from '../NKConstant';
import { TokenModel } from '../models/auth';
import http from './http';

const ENDPOINT = '/auth';

export const authApi = {
    login: async (data: { email: string; password: string }) => {
        const res = await http.post<TokenModel>(`${ENDPOINT}/login`, data);

        const cookies = new Cookies();

        cookies.set(NKConstant.TOKEN_COOKIE_KEY, res.data.token, {
            maxAge: 60 * 60 * 24 * 30 * 12,
            path: '/',
        });

        cookies.set(NKConstant.REFRESH_TOKEN_COOKIE_KEY, res.data.refreshToken, {
            maxAge: 60 * 60 * 24 * 30 * 12,
            path: '/',
        });

        return res?.data;
    },

    refreshToken: async () => {
        const cookies = new Cookies();
        const refreshToken = cookies.get(NKConstant.REFRESH_TOKEN_COOKIE_KEY) || '';

        const res = await http.post<TokenModel>(`${ENDPOINT}/refresh`, { refreshToken });

        cookies.set(NKConstant.TOKEN_COOKIE_KEY, res.data.token, {
            maxAge: 60 * 60 * 24 * 30 * 12,
            path: '/',
        });

        cookies.set(NKConstant.REFRESH_TOKEN_COOKIE_KEY, res.data.refreshToken, {
            maxAge: 60 * 60 * 24 * 30 * 12,
            path: '/',
        });

        return res?.data;
    },
};
