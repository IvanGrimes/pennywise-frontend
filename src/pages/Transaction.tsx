import { categoriesModel } from 'entities/categories';
import { transactionsModel } from 'entities/transactions';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { routes } from 'shared/routes';
import { withPrivateGuard } from './utils/withPrivateGuard';
import { TransactionDetails } from 'widgets/transaction-details';

const Transaction = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const transaction = transactionsModel.api.useGetTransactionsQuery(
    { getTransactionsRequestDto: {} },
    {
      skip: !Number.isFinite(Number(id)),
      selectFromResult: ({
        currentData,
        isError,
        error,
        isFetching,
        isUninitialized,
      }) => {
        const transactionById = currentData?.find(
          (item) => item.id === Number(id)
        );

        return {
          isFetching,
          currentData: transactionById,
          isError,
          error,
          isNotFound: isUninitialized ? false : !isFetching && !transactionById,
        };
      },
    }
  );
  const category = categoriesModel.api.useGetCategoriesQuery(undefined, {
    skip: !transaction.currentData,
    selectFromResult: ({ currentData, isFetching }) => ({
      isFetching,
      currentData: currentData?.find((item) =>
        transaction.currentData
          ? item.id === transaction.currentData.categoryId
          : false
      ),
    }),
  });

  useEffect(() => {
    if (id && !transaction.isNotFound) return;

    navigate(routes.transactions);
  }, [id, navigate, transaction.isNotFound]);

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
