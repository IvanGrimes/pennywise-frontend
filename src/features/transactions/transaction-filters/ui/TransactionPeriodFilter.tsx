import dayjs, { Dayjs } from 'dayjs';
import { viewerModel } from 'entities/viewer';
import { useCallback, useEffect } from 'react';
import { DatePickerInput } from 'shared/dates';
import { Group, SegmentedControl } from 'shared/ui';
import { useAppDispatch, useAppSelector } from 'shared/model';
import {
  changeDate,
  selectTransactionFilters,
  TransactionPeriod,
  changePeriod,
  selectPeriod,
} from '../model';

const transactionPeriodList: { value: TransactionPeriod; label: string }[] = [
  { value: TransactionPeriod.week, label: 'Week' },
  { value: TransactionPeriod.month, label: 'Month' },
  { value: TransactionPeriod.year, label: 'Year' },
  { value: TransactionPeriod.custom, label: 'Custom' },
];

export const TransactionPeriodFilter = () => {
  const period = useAppSelector(selectPeriod);
  const filters = useAppSelector(selectTransactionFilters);
  const viewer = viewerModel.api.useMeQuery();
  const dispatch = useAppDispatch();
  const handleChange = useCallback(
    (nextPeriod: TransactionPeriod) => {
      if (!viewer.currentData) return;

      let dates: [Dayjs | null, Dayjs | null] = [null, null];

      switch (nextPeriod) {
        case TransactionPeriod.week:
          dates = [dayjs().subtract(1, 'week'), dayjs()];

          break;
        case TransactionPeriod.month: {
          const today = dayjs().set('date', viewer.currentData.startDay);

          dates = [today.subtract(1, 'month'), today];

          break;
        }
        case TransactionPeriod.year:
          dates = [dayjs().subtract(1, 'year'), dayjs()];

          break;
      }

      const [dateFrom, dateTo] = dates;

      dispatch(changePeriod({ period: nextPeriod }));

      if (dateFrom && dateTo) {
        dispatch(
          changeDate({
            dateFrom: dateFrom.format('YYYY-MM-DD'),
            dateTo: dateTo.format('YYYY-MM-DD'),
          })
        );
      }
    },
    [dispatch, viewer.currentData]
  );
  const handleChangeDateFrom = (value: Date) =>
    dispatch(changeDate({ dateFrom: dayjs(value).format('YYYY-MM-DD') }));

  const handleChangeDateTo = (value: Date) =>
    dispatch(changeDate({ dateTo: dayjs(value).format('YYYY-MM-DD') }));

  useEffect(() => {
    if (filters.dateFrom || filters.dateTo) return;

    handleChange(period);
  }, [filters.dateFrom, filters.dateTo, handleChange, period]);

  return (
    <>
      <SegmentedControl
        data={transactionPeriodList}
        onChange={handleChange}
        value={period}
      />
      {period === TransactionPeriod.custom &&
        filters.dateFrom &&
        filters.dateTo && (
          <Group>
            <DatePickerInput
              onChange={handleChangeDateFrom}
              value={dayjs(filters.dateFrom).toDate()}
              popoverProps={{ withinPortal: true }}
            />
            <DatePickerInput
              onChange={handleChangeDateTo}
              value={dayjs(filters.dateTo).toDate()}
              popoverProps={{ withinPortal: true }}
            />
          </Group>
        )}
    </>
  );
};
