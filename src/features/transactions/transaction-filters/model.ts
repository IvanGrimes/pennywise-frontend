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

// @todo: разбить на файлы

export type TransactionFiltersFeatureSliceState = Omit<
  Required<transactionsModel.GetTransactionsRequestDto>,
  'dateFrom' | 'dateTo' | 'transactionType'
> &
  Pick<transactionsModel.GetTransactionsRequestDto, 'dateFrom' | 'dateTo'> & {
    transactionType: transactionsModel.TransactionType | 'all';
    opened: boolean;
    accountOptions: OptionItem[];
    categoryOptions: OptionItem[];
    period: TransactionPeriod;
    transactionTypeOptions: TransactionTypeFilterOption[];
  };

type OptionItem = { value: string; label: string };

export enum TransactionPeriod {
  week = 'week',
  month = 'month',
  year = 'year',
  custom = 'custom',
}

export type TransactionTypeFilterOption = {
  value: transactionsModel.TransactionType | 'all';
  label: string;
};

export const defaultTransactionTypeOptions: TransactionTypeFilterOption[] = [
  { value: 'all', label: 'All' },
  { value: 'outcome', label: 'Expenses' },
  { value: 'income', label: 'Income' },
];

const initialState: TransactionFiltersFeatureSliceState = {
  transactionType: 'all',
  categoryBehavior: 'include',
  categoryIds: [],
  accountIds: [],
  accountOptions: [],
  categoryOptions: [],
  period: TransactionPeriod.month,
  transactionTypeOptions: defaultTransactionTypeOptions,
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
    changeTransactionTypeOptions: (
      state,
      {
        payload,
      }: PayloadAction<{
        transactionTypeOptions: TransactionTypeFilterOption[];
      }>
    ) => {
      state.transactionTypeOptions = payload.transactionTypeOptions;
    },
    resetFilters: (state) => {
      state.period = initialState.period;
      state.categoryBehavior = initialState.categoryBehavior;
      state.transactionType = initialState.transactionType;
      state.transactionTypeOptions = initialState.transactionTypeOptions;
      state.categoryIds = [];
      state.accountIds = [];
      state.dateFrom = undefined;
      state.dateTo = undefined;
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
        state.accountOptions = payload.map<OptionItem>(({ id, name }) => ({
          value: String(id),
          label: name,
        }));
      }
    );

    builder.addMatcher(
      categoriesModel.api.endpoints.getCategories.matchFulfilled,
      (state, { payload }) => {
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
    const {
      opened,
      categoryOptions,
      accountOptions,
      period,
      transactionTypeOptions,
      ...filters
    } = state;

    return filters;
  },
  { memoizeOptions: { equalityCheck: equal, resultEqualityCheck: equal } }
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
  selectState(state).opened;

export const selectTransactionTypeOptions = (state: RootState) =>
  selectState(state).transactionTypeOptions;

export const selectFiltersApplied = (state: RootState) => {
  const { period, accountIds, categoryIds, categoryBehavior, transactionType } =
    selectState(state);
  const transactionTypeOptions = selectTransactionTypeOptions(state);

  return (
    period !== initialState.period ||
    accountIds.length ||
    categoryIds.length ||
    categoryBehavior !== initialState.categoryBehavior ||
    transactionType !== transactionTypeOptions[0].value
  );
};

export const {
  changeDate,
  changeCategoryBehavior,
  changeCategoryIds,
  changeAccountIds,
  changeTransactionType,
  changePeriod,
  changeTransactionTypeOptions,
  resetFilters,
  open,
  close,
} = actions;

export const resetFiltersThunk = createAsyncThunk(
  'transaction-filters/reset',
  async (_, { dispatch }) => {
    dispatch(resetFilters());
  }
);

export { name, reducer };
