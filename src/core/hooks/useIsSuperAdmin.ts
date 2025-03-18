import { useQuery } from '@tanstack/react-query';

import { meApi } from '../api/me';
import { UserRoleIndex } from '../models/me';

export const useIsSuperAdmin = () => {
    const userMeQuery = useQuery({
        queryKey: ['me'],
        queryFn: meApi.getMe,
    });

    return userMeQuery.data?.role.index === UserRoleIndex.SUPER_ADMIN;
};
