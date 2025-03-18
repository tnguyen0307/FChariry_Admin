import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/core/api/auth';

export const useRefreshToken = () => {
    return useMutation({
        mutationFn: authApi.refreshToken,
    });
};
