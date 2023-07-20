import { AccountList } from 'features/account-list';
import { withPrivateGuard } from './utils/withPrivateGuard';
import { AddAccountForm } from 'features/add-account-form';

const AccountsPage = () => (
  <div>
    <AddAccountForm />
    <AccountList />
  </div>
);

export default withPrivateGuard(AccountsPage);
