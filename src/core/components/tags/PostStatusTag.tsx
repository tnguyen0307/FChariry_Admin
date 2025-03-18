import { Tag } from 'antd';

import { PostStatus } from '@/core/models/post';
import { capitalize } from '@/core/utils/string.helper';

const statusColorMap = {
    [PostStatus.HIDDEN]: 'gray',
    [PostStatus.ACTIVE]: 'green',
    [PostStatus.BANNED]: 'red',
    [PostStatus.PENDING]: 'blue',
};

export const PostStatusTag = ({ status }: { status: PostStatus }) => {
    return <Tag color={statusColorMap[status]}>{capitalize(status)}</Tag>;
};
