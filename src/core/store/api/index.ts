import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';

import { ApiState } from './api.interface';

const initialState: ApiState = {
    isFetching: false,
    errorDetails: {},
    isError: false,
    message: '',
    errorMessage: '',
};

const reducer = createSlice({
    name: 'api',
    initialState,
    reducers: {
        initReq: (state) => ({ ...state, isFetching: true, isError: false }),
        setLoading: (state, { payload }: PayloadAction<{ isFetching: boolean }>) => ({
            ...state,
            isFetching: payload.isFetching,
        }),
        resetState: () => ({ ...initialState }),
        updateErrorDetails: (state, { payload }: PayloadAction<Record<string, string>>) => {
            const newState = { ...state };
            if (payload?.errorMessage) newState.errorMessage = payload.errorMessage;

            newState.errorDetails = payload;
            newState.isError = true;
            return newState;
        },
        updateSuccessMessage: (state, { payload }: PayloadAction<Record<string, string>>) => ({
            ...state,
            message: payload.message || '',
        }),
    },
});

export const apiActions = {
    ...reducer.actions,
    getRoles: createAction('api/getRoles'),
};
export const apiReducer = reducer.reducer;
