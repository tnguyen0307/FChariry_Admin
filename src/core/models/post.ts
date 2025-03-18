export interface PostModel {
    id: string;
    userId: string;
    title: string;
    content: string;
    vote: number;
    createdAt: string;
    updatedAt: string;
    postStatus: PostStatus;
}

export enum PostStatus {
    PENDING = 'PENDING',
    ACTIVE = 'ACTIVE',
    HIDDEN = 'HIDDEN',
    BANNED = 'BANNED',
}
