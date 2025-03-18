import { Tag } from 'antd';

import { UserStatus } from '@/core/models/user';
import { capitalize } from '@/core/utils/string.helper';

export const userStatusColors: Readonly<Record<UserStatus, string>> = Object.freeze({
    Verified: 'green',
    Unverified: 'blue',
    Banned: 'red',
});

export const UserStatusTag = ({ status }: { status: UserStatus }) => {
    return <Tag color={userStatusColors[status]}>{capitalize(status)}</Tag>;
};
