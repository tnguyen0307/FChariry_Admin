export interface WithdrawRequestModel {
    id: string;
    projectName: string;
    requestTitle: string;
    amount: number;
    reason: string;
    note: string;
    bankAccount: string;
    bankBin: string;
    bankOwner: string;
    transactionImage: string;
    transactionCode: string;
    status: string;
    createdDate: Date;
    updatedDate: Date;
}

export enum WithdrawRequestStatus {
    PENDING_USER_CONFIRM = 'PENDING_USER_CONFIRM',
    PENDING_ADMIN_APPROVAL = 'PENDING_ADMIN_APPROVAL',
    CONFIRM_SENT = 'CONFIRM_SENT',
    COMPLETED = 'COMPLETED',
    ERROR = 'ERROR',
}
