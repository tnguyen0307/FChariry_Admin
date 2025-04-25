import { useQuery } from '@tanstack/react-query';

import { fileApi } from '@/core/api/file';

export const useGetFilesByOrganizationId = (organizationId: string) => {
    return useQuery({
        queryKey: ['files', organizationId],
        queryFn: () => fileApi.getOrganizationFiles(organizationId),
        enabled: !!organizationId,
    });
};
