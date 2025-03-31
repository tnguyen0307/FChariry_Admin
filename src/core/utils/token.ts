import { jwtDecode } from 'jwt-decode';

export const isValidToken = (token: string) => {
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            const aud = decodedToken?.aud;
            const exp = decodedToken?.exp;

            if (aud && exp && exp > Math.floor(Date.now() / 1000)) {
                return true;
            }
        } catch (error) {
            return false;
        }
    }

    return false;
};
