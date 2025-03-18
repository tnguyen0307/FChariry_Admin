import React from 'react';

import { isAxiosError } from 'axios';
import _ from 'lodash';
import { Cookies, useCookies } from 'react-cookie';

import { FCConstant } from '../FCConstant';
import { useRefreshToken } from '../hooks/query/auth.hook';
import { useGetCurrentUser } from '../hooks/query/users.hook';
import { CurrentUserModel } from '../models/user';
import { isValidToken } from '../utils/token';

export type AuthenticationStatus = 'loading' | 'authenticated' | 'unauthenticated' | 'deleted';

export type AuthContextType = {
    isLogin: boolean;
    status: AuthenticationStatus;
    logout: () => void;
    currentUser: CurrentUserModel | undefined;
    refetchUser: () => void;
    error: {
        isError: boolean;
        message: string;
        statusCode: number;
    };
    setStatus: React.Dispatch<React.SetStateAction<AuthenticationStatus>>;
};

const AuthContext = React.createContext<AuthContextType>({
    isLogin: false,
    status: 'loading',
    logout: () => {},
    currentUser: undefined,
    refetchUser: () => {},
    error: {
        isError: false,
        message: '',
        statusCode: 401,
    },
    setStatus: () => {},
});

interface AuthProviderProps extends React.PropsWithChildren<{}> {}

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({ children }) => {
    const [isMounted, setIsMounted] = React.useState(false);
    const [isLogin, setIsLogin] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState<CurrentUserModel | undefined>(undefined);

    const [status, setStatus] = React.useState<AuthenticationStatus>('loading');

    const { data: fetchedUser, isError, error, refetch, isFetching } = useGetCurrentUser();
    const { mutate: postRefreshTokenMutation } = useRefreshToken();

    const [cookies, _, removeCookie] = useCookies([FCConstant.TOKEN_COOKIE_KEY, FCConstant.REFRESH_TOKEN_COOKIE_KEY]);

    const logout = React.useCallback(() => {
        const cookies = new Cookies();
        cookies.remove(FCConstant.TOKEN_COOKIE_KEY, {
            path: '/',
        });
        cookies.remove(FCConstant.REFRESH_TOKEN_COOKIE_KEY, {
            path: '/',
        });

        setStatus('unauthenticated');
        setCurrentUser(undefined);
        setIsLogin(false);
        location.reload();
    }, [removeCookie]);

    React.useEffect(() => {
        if (!fetchedUser || isFetching) {
            return;
        }

        setCurrentUser(fetchedUser);
    }, [fetchedUser, isFetching]);

    React.useEffect(() => {
        if (!isMounted) {
            setIsMounted(true);
            return;
        }

        if (isValidToken(cookies['access-token']) || status === 'deleted') {
            return;
        }

        if (cookies['refresh-token'] || status === 'unauthenticated') {
            return;
        }

        logout();
    }, [status, isMounted, cookies, logout]);

    const errorObj = React.useMemo(() => {
        if (isAxiosError(error)) {
            const statusCode = Number(error.response?.data.statusCode ?? 401);
            const message = error.response?.data.message ?? 'Something went wrong. Please try again later.';
            return {
                isError,
                message,
                statusCode,
            };
        }

        return {
            isError: false,
            message: '',
            statusCode: 200,
        };
    }, [isError, error]);

    React.useEffect(() => {
        if (!isError) {
            return;
        }

        if (errorObj.statusCode === 403) {
            logout();
            return;
        }

        if (errorObj.statusCode === 401) {
            removeCookie(FCConstant.TOKEN_COOKIE_KEY);
            postRefreshTokenMutation();
        }
    }, [errorObj, isError, postRefreshTokenMutation]);

    // if token calling api got error, it will automatically remove that token
    React.useEffect(() => {
        if (status === 'deleted') {
            return;
        }

        if (cookies[FCConstant.TOKEN_COOKIE_KEY] || cookies[FCConstant.REFRESH_TOKEN_COOKIE_KEY]) {
            setIsLogin(true);
            setStatus('authenticated');
            return;
        }

        setIsLogin(false);
        setStatus('unauthenticated');
        setCurrentUser(undefined);
    }, [cookies, status]);

    return (
        <AuthContext.Provider value={{ isLogin, status, logout, currentUser, refetchUser: refetch, error: errorObj, setStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
