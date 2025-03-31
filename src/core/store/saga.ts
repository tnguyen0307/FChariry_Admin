import { all } from 'redux-saga/effects';

import apiSaga from './api/api.saga';

export default function* rootSaga() {
    yield all([apiSaga()]);
}
