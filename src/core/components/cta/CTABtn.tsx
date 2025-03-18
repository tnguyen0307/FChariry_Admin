import * as React from 'react';

import { useMutation } from '@tanstack/react-query';
import { Popconfirm } from 'antd/lib';

interface CTAButtonProps {
    ctaApi: () => any;
    children: React.ReactNode;
    locale?: string;
    isConfirm?: boolean;
    confirmMessage?: string;
    extraOnSuccess?: () => void;
    extraOnError?: (error: any) => void;
}

const CTAButton: React.FC<CTAButtonProps> = ({
    children,
    extraOnSuccess,
    extraOnError,
    ctaApi,
    locale = 'en',
    confirmMessage = 'Are you sure?',
    isConfirm = false,
}) => {
    const ctaMutation = useMutation({
        mutationFn: ctaApi,
        onSuccess: (data) => {
            extraOnSuccess && extraOnSuccess();
        },
        onError: (error) => {
            extraOnError && extraOnError(error);
        },
    });

    if (!isConfirm) {
        return <div onClick={() => ctaMutation.mutate()}>{children}</div>;
    }

    return (
        <Popconfirm title={confirmMessage} onConfirm={() => ctaMutation.mutate()}>
            {children}
        </Popconfirm>
    );
};

export default CTAButton;
