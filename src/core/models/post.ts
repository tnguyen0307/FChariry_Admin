export interface PostModel {
    id: string;
    userId: string;
    title: string;
    content: string;
    vote: number;
    createdAt: string;
    updatedAt: string;
    postStatus: PostStatus;
    reason: string;
}

export enum PostStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    BANNED = 'BANNED',
}
