export interface OrganizationModel {
    id: string;
    organizationName: string;
    email: string;
    phoneNumber: string;
    address: string;
    organizationDescription: string;
    startTime: string;
    shutdownDay: string;
    organizationStatus: OrganizationStatus;
    ceoId: string;
}

export enum OrganizationStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    COMPLETED = 'COMPLETED',
    HIDDEN = 'HIDDEN',
    BANNED = 'BANNED',
}
