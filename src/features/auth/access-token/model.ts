import {
  createListenerMiddleware,
  isAnyOf,
  TypedStartListening,
  PayloadAction,
} from '@reduxjs/toolkit';
import { authModel } from 'entities/auth';
import { signOutThunk } from '../sign-out';
import {
  appInitEvent,
  refreshTokenFail,
  refreshTokenSuccess,
} from 'shared/model';
import { readAccessToken, removeAccessToken, writeAccessToken } from './utils';

export const accessTokenListener = createListenerMiddleware();

const startAccessTokenListener =
  accessTokenListener.startListening as TypedStartListening<
    RootState,
    AppDispatch
  >;

startAccessTokenListener({
  matcher: isAnyOf(
    authModel.api.endpoints.signIn.matchFulfilled,
    authModel.api.endpoints.signUp.matchFulfilled,
    authModel.api.endpoints.refresh.matchFulfilled,
    refreshTokenSuccess
  ),
  effect: (action, { dispatch }) => {
    const { payload } = action as PayloadAction<
      | typeof authModel.api.endpoints.signIn.Types.ResultType
      | typeof authModel.api.endpoints.signUp.Types.ResultType
      | typeof authModel.api.endpoints.refresh.Types.ResultType
    >;

    writeAccessToken(payload.accessToken);
    dispatch(authModel.updateToken({ accessToken: payload.accessToken }));
  },
});

startAccessTokenListener({
  matcher: isAnyOf(authModel.api.endpoints.signOut.matchFulfilled),
  effect: (_, { dispatch }) => {
    removeAccessToken();
    dispatch(authModel.removeToken());
  },
});

startAccessTokenListener({
  actionCreator: refreshTokenFail,
  effect: (_, { dispatch }) => {
    dispatch(signOutThunk());
  },
});

startAccessTokenListener({
  actionCreator: appInitEvent,
  effect: (_, { dispatch }) => {
    const accessToken = readAccessToken();

    dispatch(authModel.updateToken({ accessToken }));
  },
});
