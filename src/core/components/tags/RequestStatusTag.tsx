import { Tag } from 'antd';

import { RequestStatus } from '@/core/models/request';
import { capitalize } from '@/core/utils/string.helper';

const statusColorMap = {
    [RequestStatus.PENDING]: 'blue',
    [RequestStatus.APPROVED]: 'green',
    [RequestStatus.REJECTED]: 'red',
    [RequestStatus.COMPLETED]: 'green',
    [RequestStatus.HIDDEN]: 'red',
};

export const RequestStatusTag = ({ status }: { status: RequestStatus }) => {
    return <Tag color={statusColorMap[status]}>{capitalize(status)}</Tag>;
};
