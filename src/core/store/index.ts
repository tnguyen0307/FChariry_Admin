import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { FCConfig } from '../FCConfig';
import { apiReducer } from './api';
import { ApiState } from './api/api.interface';
import { apiMiddleware } from './api/api.middleware';
import rootSaga from './saga';


const sageMiddleware = createSagaMiddleware();

const middleware: any[] = [sageMiddleware, apiMiddleware];
export interface RootState {
    api: ApiState;

}

const reducers = combineReducers({
    api: apiReducer,

});

export const store = configureStore({
    reducer: reducers,
    middleware,
    devTools: FCConfig.NODE_ENV !== 'production',
});

sageMiddleware.run(rootSaga);
