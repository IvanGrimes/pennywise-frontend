import { configureStore } from '@reduxjs/toolkit';
import { api } from 'shared/api';
import { authModel } from 'entities/auth';
import { accountSelectModel } from 'features/accounts/account-select';
import { addCategoryModalModel } from 'features/categories/add-category-modal';
import { categorySelectModel } from 'features/categories/category-select';
import { deleteCategoryModel } from 'features/categories/delete-category-modal';
import { transactionFiltersModel } from 'features/transactions/transaction-filters';
import { accessTokenListener } from 'features/auth/access-token';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [authModel.name]: authModel.reducer,
    [categorySelectModel.name]: categorySelectModel.reducer,
    [accountSelectModel.name]: accountSelectModel.reducer,
    [addCategoryModalModel.name]: addCategoryModalModel.reducer,
    [deleteCategoryModel.name]: deleteCategoryModel.reducer,
    [transactionFiltersModel.name]: transactionFiltersModel.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(accessTokenListener.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
