import { createAsyncThunk } from '@reduxjs/toolkit';
import { accountsModel } from 'entities/accounts';
import { authModel } from 'entities/auth';
import { categoriesModel } from 'entities/categories';
import { sessionModel } from 'entities/session';
import { transactionsModel } from 'entities/transactions';
import { viewerModel } from 'entities/viewer';

export const signOutThunk = createAsyncThunk<void, void, { state: RootState }>(
  'auth/sign-out',
  async (_, { dispatch }) => {
    await dispatch(authModel.api.endpoints.signOut.initiate()).unwrap();

    dispatch(viewerModel.api.util.invalidateTags(['user']));
    dispatch(sessionModel.api.util.invalidateTags(['session']));
    dispatch(categoriesModel.api.util.invalidateTags(['categories']));
    dispatch(transactionsModel.api.util.invalidateTags(['transactions']));
    dispatch(accountsModel.api.util.invalidateTags(['accounts']));
  }
);
