import { useQuery } from '@tanstack/react-query';

import { usersApi } from '@/core/api/users';
import { QUERY_CONSTANT } from '@/core/constant/query';

export const useGetCurrentUser = () => {
    return useQuery({
        queryKey: [QUERY_CONSTANT.CURRENT_USER],
        queryFn: usersApi.getCurrentUser,
    });
};
