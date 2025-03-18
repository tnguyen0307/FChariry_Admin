export interface RequestModel {
    id: string;
    userId: string;
    title: string;
    content: string;
    creationDate: string;
    phone: string;
    email: string;
    location: string;
    categoryId: string;
    tagIds: string[];
    status: RequestStatus;
    imageUrls: string[];
    videoUrls: string[];
    emergency: boolean;
}

export enum RequestStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    COMPLETED = 'COMPLETED',
    HIDDEN = 'HIDDEN',
}
