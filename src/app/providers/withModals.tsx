import { TransactionFiltersModal } from 'features/transactions/transaction-filters';
import { FunctionComponent } from 'react';

export const withModals = (Component: FunctionComponent) => {
  const WrappedComponent = () => (
    <>
      <TransactionFiltersModal />
      <Component />
    </>
  );

  return WrappedComponent;
};
