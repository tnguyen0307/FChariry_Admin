import React from 'react';

import { createFileRoute, redirect } from '@tanstack/react-router';
import joi from 'joi';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';

import { FCConstant } from '@/core/FCConstant';
import { authApi } from '@/core/api/auth';
import { usersApi } from '@/core/api/users';
import { queryClient } from '@/core/common/config';
import FormBuilder from '@/core/components/form/FormBuilder';
import { FCFormType } from '@/core/components/form/FCForm';
import { QUERY_CONSTANT } from '@/core/constant/query';
import { useFCRouter } from '@/core/routing/hooks/FCRouter';

const Page: React.FunctionComponent = () => {
    const router = useFCRouter();

    return (
        <div className="flex min-h-screen">
            <div className="flex flex-1 items-center justify-center bg-[url('/assets/images/bg.jpeg')] bg-cover">
                <div className="w-full max-w-sm rounded-lg bg-white px-6 py-10">
                    <div className="mb-8 w-full items-center justify-center">
                        <div className="relative flex  flex-col items-center gap-2 p-2">
                            <img src="/logo.svg" className="h-20" />
                        </div>
                    </div>

                    <FormBuilder
                        title=""
                        className="p-0"
                        apiAction={authApi.login}
                        defaultValues={{
                            email: '',
                            password: '',
                        }}
                        fields={[
                            {
                                type: FCFormType.TEXT,
                                name: 'email',
                                label: 'Email',
                            },
                            {
                                type: FCFormType.PASSWORD,
                                name: 'password',
                                label: 'Password',
                            },
                        ]}
                        schema={{
                            email: joi
                                .string()
                                .email({
                                    tlds: false,
                                })
                                .required()
                                .messages(FCConstant.MESSAGE_FORMAT),
                            password: joi.string().required().messages(FCConstant.MESSAGE_FORMAT),
                        }}
                        btnLabel="Sign in"
                        onExtraSuccessAction={(data) => {
                            // window.location.reload();
                            router.push('/dashboard')
                        }}
                        onExtraErrorAction={(error) => {
                            toast.error('Email or password is incorrect');
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export const Route = createFileRoute('/')({
    component: Page,
    async beforeLoad() {
        // const user = await queryClient.ensureQueryData({
        //     queryKey: [QUERY_CONSTANT.CURRENT_USER],
        //     queryFn: async () => {
        //         const res = await usersApi
        //             .getCurrentUser()
        //             .then((res) => res)
        //             .catch(() => null);

        //         return res;
        //     },
        // });

        // const cookies = new Cookies();
        // const token = cookies.get(FCConstant.TOKEN_COOKIE_KEY);
        // if (!token && token === 'undefined') {
        //     cookies.remove(FCConstant.TOKEN_COOKIE_KEY);
        // }
        const cookies = new Cookies();
        cookies.remove(FCConstant.TOKEN_COOKIE_KEY, { path: '/' });
        cookies.remove(FCConstant.REFRESH_TOKEN_COOKIE_KEY, { path: '/' });

        queryClient.removeQueries({ queryKey: [QUERY_CONSTANT.CURRENT_USER] });

        const user = await usersApi
            .getCurrentUser()
            .then(() => true)
            .catch(() => false);

        if (user) {
            throw redirect({
                to: '/dashboard',
            });
        }
    },
});
