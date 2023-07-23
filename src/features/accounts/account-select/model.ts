import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AccountSelectFeatureSliceState = {
  accountId: number | null;
};

const initialState: AccountSelectFeatureSliceState = {
  accountId: null,
};

const slice = createSlice({
  name: 'accountSelectFeature',
  initialState,
  reducers: {
    changeAccountId: (state, action: PayloadAction<number | null>) => {
      state.accountId = action.payload;
    },
  },
});

const { name, reducer, actions } = slice;

export const { changeAccountId } = actions;

export const selectAccountId = (state: RootState) =>
  state.accountSelectFeature.accountId;

export { name, reducer };
