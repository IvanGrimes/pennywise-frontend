import { categoriesModel } from 'entities/categories';
import { transactionsModel } from 'entities/transactions';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { isApiError } from 'shared/api';
import { routes } from 'shared/routes';
import { withPrivateGuard } from './utils/withPrivateGuard';
import { TransactionDetails } from 'widgets/transaction-details';

const Transaction = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const transaction = transactionsModel.api.useGetTransactionsQuery(undefined, {
    skip: !Number.isFinite(Number(id)),
    selectFromResult: ({ currentData, isError, error, isFetching }) => ({
      isFetching,
      currentData: currentData?.find((item) => item.id === Number(id)),
      isError,
      error,
    }),
  });
  const category = categoriesModel.api.useGetCategoriesQuery(undefined, {
    skip: !transaction.currentData,
    selectFromResult: ({ currentData, isFetching }) => ({
      isFetching,
      currentData: currentData
        ? currentData.find((item) =>
            transaction.currentData
              ? item.id === transaction.currentData.categoryId
              : false
          )
        : undefined,
    }),
  });

  useEffect(() => {
    if (id) return;

    navigate(routes.transactions);
  }, [id, navigate]);

  useEffect(() => {
    if (!transaction.isError) return;

    if (isApiError(transaction.error) && transaction.error.status === 404) {
      navigate(routes.transactions);
    }
  }, [navigate, transaction.error, transaction.isError]);

  if (
    !id ||
    !transaction.currentData ||
    (!transaction.currentData && transaction.isFetching) ||
    !category.currentData ||
    (!category.currentData && category.isFetching)
  ) {
    return <>Loading</>;
  }

  return (
    <TransactionDetails
      {...transaction.currentData}
      category={category.currentData}
    />
  );
};

export default withPrivateGuard(Transaction);
