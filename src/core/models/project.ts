export interface ProjectModel {
    id: string;
    projectName: string;
    organizationId: string;
    leaderId: string;
    email: string;
    phoneNumber: string;
    projectDescription: string;
    projectStatus: ProjectStatus;
    reportFile: string;
    plannedStartTime: string;
    plannedEndTime: string;
    actualStartTime: string;
    actualEndTime: string;
    shutdownReason: string;
    categoryId: string;
    walletAddress: string;
}

export enum ProjectStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    COMPLETED = 'COMPLETED',
    HIDDEN = 'HIDDEN',
}
