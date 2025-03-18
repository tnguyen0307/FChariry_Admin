import { Tag } from 'antd';

import { OrganizationStatus } from '@/core/models/organization';
import { capitalize } from '@/core/utils/string.helper';

const statusColorMap = {
    [OrganizationStatus.PENDING]: 'blue',
    [OrganizationStatus.APPROVED]: 'green',
    [OrganizationStatus.REJECTED]: 'red',
    [OrganizationStatus.COMPLETED]: 'green',
    [OrganizationStatus.HIDDEN]: 'red',
};
export const OrganizationStatusTag = ({ status }: { status: OrganizationStatus }) => {
    return <Tag color={statusColorMap[status]}>{capitalize(status)}</Tag>;
};
