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
  const parsedId = Number(id);
  const transaction = transactionsModel.api.useGetTransactionByIdQuery(
    { id: parsedId },
    { skip: !Number.isFinite(parsedId) }
  );
  const isNotFound = !transaction.isFetching && !transaction.currentData;
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
    if (id && !isNotFound) return;

    navigate(routes.transactions);
  }, [id, navigate, isNotFound]);

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
