import { Tag } from 'antd';

import { WithdrawRequestStatus } from '@/core/models/withdrawRequest';
import { capitalize } from '@/core/utils/string.helper';

const statusColorMap = {
    [WithdrawRequestStatus.PENDING_USER_CONFIRM]: 'blue',
    [WithdrawRequestStatus.PENDING_ADMIN_APPROVAL]: 'green',
    [WithdrawRequestStatus.CONFIRM_SENT]: 'green',
    [WithdrawRequestStatus.COMPLETED]: 'green',
    [WithdrawRequestStatus.ERROR]: 'red',
};
export const WithdrawRequestStatusTag = ({ status }: { status: WithdrawRequestStatus }) => {
    return <Tag color={statusColorMap[status]}>{capitalize(status)}</Tag>;
};
