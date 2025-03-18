export interface ApiState {
    isFetching: boolean;
    errorDetails: Record<string, string>;
    isError: boolean;
    message: string;
    errorMessage: string;
}
