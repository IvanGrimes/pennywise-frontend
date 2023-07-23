import { createAsyncThunk } from '@reduxjs/toolkit';
import { authModel } from 'entities/auth';
import { sessionModel } from 'entities/session';
import { viewerModel } from 'entities/viewer';

export const signOutThunk = createAsyncThunk<void, void, { state: RootState }>(
  'auth/sign-out',
  async (_, { dispatch }) => {
    await dispatch(authModel.api.endpoints.signOut.initiate()).unwrap();

    dispatch(viewerModel.api.util.invalidateTags(['user']));
    dispatch(sessionModel.api.util.invalidateTags(['session']));
  }
);
