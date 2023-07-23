import { AccountList } from 'widgets/account-list';
import { AddAccountModal } from 'widgets/add-account-modal';
import { withPrivateGuard } from './utils/withPrivateGuard';

const AccountsPage = () => (
  <div>
    <AddAccountModal />
    <AccountList />
  </div>
);

export default withPrivateGuard(AccountsPage);
