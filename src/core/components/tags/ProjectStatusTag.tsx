import React from 'react';

import { Tag } from 'antd';

import { ProjectStatus } from '@/core/models/project';
import { capitalize } from '@/core/utils/string.helper';

interface ProjectStatusTagProps {
    status: ProjectStatus;
}

const statusColorMap = {
    [ProjectStatus.DONATING]: 'blue',
    [ProjectStatus.ACTIVE]: 'green',
    [ProjectStatus.FINISHED]: 'green',
    [ProjectStatus.BANNED]: 'red',
};

export const ProjectStatusTag: React.FC<ProjectStatusTagProps> = ({ status }) => {
    return <Tag color={statusColorMap[status]}>{capitalize(status)}</Tag>;
};
