import { Tag } from 'antd';

import { UserRole } from '@/core/models/user';
import { capitalize } from '@/core/utils/string.helper';

export const userRoleColors: Readonly<Record<UserRole, string>> = Object.freeze({
    Admin: 'red',
    User: 'blue',
});

export const UserRoleTag = ({ role }: { role: UserRole }) => {
    return <Tag color={userRoleColors[role]}>{capitalize(role)}</Tag>;
};
