import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
    retry,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { RootState } from '../root/root-state.interface';
import { authSlice, AuthSliceMethods } from '../slices/authSlice';
import { message } from 'antd';
import { validateHrWebResponse } from './validations';
import { mode, setUrlSource } from '../../utils';
import { GetRefreshedToken } from '../../axios/axiosinstance';

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
    baseUrl: setUrlSource(mode),
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const jwtToken = window.localStorage.getItem('token');
        if (jwtToken) {
            headers.set('Authorization', `Bearer ${jwtToken}`);
        }
        headers.set('Content-Type', 'application/json; charset=utf-8');
        return headers;
    },
});
const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const rootState = api.getState() as RootState;
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if (!rootState.authSlice.isLoggedIn) {
        // api.dispatch(authSlice.actions.clearAuthCredentials());
        const release = await mutex.acquire();
        await api.dispatch(AuthSliceMethods.getUserInfo());
        release();
        return result;
    }
    try {
        validateHrWebResponse(result.data);
    } catch (ex) {
        message.error(String(ex));
    }

    if (result.error && result.error.status === 'FETCH_ERROR') {
        message.error('Проблема сети - Убедитесь что вы подключены к сети.');
    }
    if (result.error && result.error.status === 401) {
        // try to get a new token
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const newAccessToken = await GetRefreshedToken();

                if (newAccessToken) {
                    // retry the initial query
                    result = await baseQuery(args, api, extraOptions);
                }
            } catch (ex: any) {
                message.error('Не удалось авторизоваться автоматически');
                api.dispatch(authSlice.actions.clearAuthCredentials());
            } finally {
                // release must be called once the mutex should be released again.
                release();
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};

const staggeredBaseQuery = retry(baseQueryWithReauth, {
    maxRetries: 0,
});

export const mainApi = createApi({
    reducerPath: 'mainApi',
    baseQuery: staggeredBaseQuery,
    endpoints: () => ({}),
    keepUnusedDataFor: 0,
});
