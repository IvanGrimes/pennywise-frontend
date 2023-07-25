import { createSlice } from '@reduxjs/toolkit';

type DeleteCategoryModalFeatureSliceState = {
  opened: boolean;
};

const initialState: DeleteCategoryModalFeatureSliceState = {
  opened: false,
};

const slice = createSlice({
  name: 'deleteCategoryModalFeature',
  initialState,
  reducers: {
    open: (state) => {
      state.opened = true;
    },
    close: (state) => {
      state.opened = false;
    },
  },
});

const { name, reducer, actions } = slice;

export const { open, close } = actions;

export const selectDeleteCategoryModalOpened = (state: RootState) =>
  state.deleteCategoryModalFeature.opened;

export { name, reducer };
