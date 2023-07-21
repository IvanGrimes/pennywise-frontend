import { AccountList } from 'widgets/account-list';
import { withPrivateGuard } from './utils/withPrivateGuard';
import { AddAccountForm } from 'features/accounts/add-account-form';

const AccountsPage = () => (
  <div>
    <AddAccountForm />
    <AccountList />
  </div>
);

export default withPrivateGuard(AccountsPage);
