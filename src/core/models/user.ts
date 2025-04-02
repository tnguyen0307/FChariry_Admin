export interface CurrentUserModel {
    id: string;
    fullName: string;
    email: string;
    password: string;
    phoneNumber: any;
    address: any;
    avatar: string;
    userRole: UserRole;
    createdDate: string;
    userStatus: UserStatus;
    verificationCode: any;
    walletAddress: any;
}

export interface UserModel {
    id: string;
    fullName: string;
    email: string;
    password: string;
    phoneNumber: any;
    address: string;
    avatar: string;
    userRole: UserRole;
    createdDate: string;
    userStatus: UserStatus;
    verificationCode: string;
    verificationCodeExpiresAt: string;
    walletAddress: string;
    enabled: boolean;
    accountNonExpired: boolean;
    authorities: string[];
    username: string;
    credentialsNonExpired: boolean;
    accountNonLocked: boolean;
    reason: string;
}

export enum UserStatus {
    Unverified = 'Unverified',
    Verified = 'Verified',
    Banned = 'Banned',
}

export enum UserRole {
    Admin = 'Admin',
    User = 'User',
}
