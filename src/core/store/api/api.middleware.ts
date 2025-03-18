import { Action, Middleware } from 'redux';

import { apiActions } from '.';
import { RootState } from '..';

export const apiMiddleware: Middleware<{}, RootState> = (store) => (next) => (action: Action) => {
    return next(action);
};
