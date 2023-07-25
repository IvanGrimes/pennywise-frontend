import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AddCategoryModalFeatureSliceState = {
  opened: boolean;
  name: string | null;
};

const initialState: AddCategoryModalFeatureSliceState = {
  opened: false,
  name: null,
};

const slice = createSlice({
  name: 'addCategoryModalFeature',
  initialState,
  reducers: {
    open: (state) => {
      state.opened = true;
    },
    close: (state) => {
      state.opened = false;
      state.name = null;
    },
    changeName: (
      state,
      action: PayloadAction<AddCategoryModalFeatureSliceState['name']>
    ) => {
      state.name = action.payload;
    },
  },
});

const { name, reducer, actions } = slice;

export const { open, close, changeName } = actions;

export const selectAddCategoryFormOpened = (state: RootState) =>
  state.addCategoryModalFeature.opened;

export const selectAddCategoryFormName = (state: RootState) =>
  state.addCategoryModalFeature.name;

export { name, reducer };
