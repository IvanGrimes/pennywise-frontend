import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CategorySelectFeatureSliceState = {
  categoryId: number | null;
};

const initialState: CategorySelectFeatureSliceState = {
  categoryId: null,
};

const slice = createSlice({
  name: 'categorySelectFeature',
  initialState,
  reducers: {
    changeCategoryId: (state, action: PayloadAction<number | null>) => {
      state.categoryId = action.payload;
    },
  },
});

const { name, reducer, actions } = slice;

export const { changeCategoryId } = actions;

export const selectCategoryId = (state: RootState) =>
  state.categorySelectFeature.categoryId;

export { name, reducer };
