import axios, { AxiosError } from 'axios';
import Cookies from 'universal-cookie';

import { FCConfig } from '../FCConfig';
import { FCConstant } from '../FCConstant';

export const http = axios.create({
    baseURL: FCConfig.API_URL,
    withCredentials: false,
});

http.interceptors.request.use(function (req) {
    const cookies = new Cookies();
    const token = cookies.get(FCConstant.TOKEN_COOKIE_KEY) || '';

    if (token && req.headers) req.headers[FCConstant.TOKEN_HEADER_KEY] = `Bearer ${token}`;

    return req;
});
http.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error: AxiosError) {
        if (error.response?.status === 401) {
            const cookies = new Cookies();
            cookies.remove(FCConstant.TOKEN_COOKIE_KEY);
        }

        return Promise.reject(error.response);
    },
);
export default http;
