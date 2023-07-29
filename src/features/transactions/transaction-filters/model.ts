import {
  createSlice,
  PayloadAction,
  createSelector,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { accountsModel } from 'entities/accounts';
import { categoriesModel } from 'entities/categories';
import { transactionsModel } from 'entities/transactions';
import equal from 'fast-deep-equal/react';

type TransactionFiltersFeatureSliceState = Omit<
  Required<transactionsModel.GetTransactionsRequestDto>,
  'dateFrom' | 'dateTo'
> &
  Pick<transactionsModel.GetTransactionsRequestDto, 'dateFrom' | 'dateTo'> & {
    opened: boolean;
    accountOptions: OptionItem[];
    categoryOptions: OptionItem[];
    period: TransactionPeriod;
  };

type OptionItem = { value: string; label: string };

export enum TransactionPeriod {
  week = 'week',
  month = 'month',
  year = 'year',
  custom = 'custom',
}

const initialState: TransactionFiltersFeatureSliceState = {
  transactionType: 'outcome',
  categoryBehavior: 'include',
  categoryIds: [],
  accountIds: [],
  accountOptions: [],
  categoryOptions: [],
  period: TransactionPeriod.month,
  opened: false,
};

const slice = createSlice({
  name: 'transactionFiltersFeature',
  initialState,
  reducers: {
    changeDate: (
      state,
      {
        payload,
      }: PayloadAction<
        Partial<
          Pick<TransactionFiltersFeatureSliceState, 'dateFrom' | 'dateTo'>
        >
      >
    ) => {
      if (payload.dateFrom) {
        state.dateFrom = payload.dateFrom;
      }
      if (payload.dateTo) {
        state.dateTo = payload.dateTo;
      }
    },
    changeTransactionType: (
      state,
      {
        payload,
      }: PayloadAction<
        Pick<TransactionFiltersFeatureSliceState, 'transactionType'>
      >
    ) => {
      state.transactionType = payload.transactionType;
    },
    changeCategoryBehavior: (
      state,
      {
        payload,
      }: PayloadAction<
        Pick<TransactionFiltersFeatureSliceState, 'categoryBehavior'>
      >
    ) => {
      state.categoryBehavior = payload.categoryBehavior;
    },
    changeCategoryIds: (
      state,
      {
        payload,
      }: PayloadAction<Pick<TransactionFiltersFeatureSliceState, 'categoryIds'>>
    ) => {
      state.categoryIds = payload.categoryIds;
    },
    changeAccountIds: (
      state,
      {
        payload,
      }: PayloadAction<Pick<TransactionFiltersFeatureSliceState, 'accountIds'>>
    ) => {
      state.accountIds = payload.accountIds;
    },
    changePeriod: (
      state,
      {
        payload,
      }: PayloadAction<Pick<TransactionFiltersFeatureSliceState, 'period'>>
    ) => {
      state.period = payload.period;
    },
    changeReadiness: (state, { payload }: PayloadAction<boolean>) => {
      state.ready = payload;
    },
    open: (state) => {
      state.opened = true;
    },
    close: (state) => {
      state.opened = false;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      accountsModel.api.endpoints.getAccounts.matchFulfilled,
      (state, { payload }) => {
        state.accountIds = payload.map((item) => item.id);
        state.accountOptions = payload.map<OptionItem>(({ id, name }) => ({
          value: String(id),
          label: name,
        }));
      }
    );

    builder.addMatcher(
      categoriesModel.api.endpoints.getCategories.matchFulfilled,
      (state, { payload }) => {
        state.categoryIds = payload.map((item) => item.id);
        state.categoryOptions = payload.map<OptionItem>(({ id, name }) => ({
          value: String(id),
          label: name,
        }));
      }
    );
  },
});

const { name, reducer, actions } = slice;

const selectState = (state: RootState) => state.transactionFiltersFeature;

export const selectTransactionFilters = createSelector(
  [selectState],
  (state) => {
    const { opened, categoryOptions, accountOptions, period, ...filters } =
      state;

    return filters;
  },
  { memoizeOptions: { equalityCheck: equal } }
);

export const selectCategoryOptions = createSelector(
  [selectState],
  (state) => state.categoryOptions
);

export const selectAccountOptions = createSelector(
  [selectState],
  (state) => state.accountOptions
);

export const selectPeriod = (state: RootState) => selectState(state).period;

export const selectTransactionFiltersModalOpened = (state: RootState) =>
  state.transactionFiltersFeature.opened;

export const {
  changeDate,
  changeCategoryBehavior,
  changeCategoryIds,
  changeAccountIds,
  changeTransactionType,
  changePeriod,
  open,
  close,
} = actions;

export const resetFiltersThunk = createAsyncThunk<
  void,
  void,
  { state: RootState }
>('transactions-filters/reset', (_, { getState, dispatch }) => {
  const state = getState() as never;
  const accounts = accountsModel.api.endpoints.getAccounts.select()(state);
  const categories =
    categoriesModel.api.endpoints.getCategories.select()(state);

  if (accounts.data) {
    dispatch(
      changeAccountIds({ accountIds: accounts.data.map((item) => item.id) })
    );
  }

  if (categories.data) {
    dispatch(
      changeCategoryIds({ categoryIds: categories.data.map((item) => item.id) })
    );
  }

  dispatch(
    changeTransactionType({ transactionType: initialState.transactionType })
  );
  dispatch(
    changeCategoryBehavior({ categoryBehavior: initialState.categoryBehavior })
  );
  dispatch(changePeriod({ period: initialState.period }));
});

export { name, reducer };
