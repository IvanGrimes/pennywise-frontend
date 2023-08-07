import { withPrivateGuard } from './utils/withPrivateGuard';
import { ExpensesOverview } from 'widgets/expenses-overview';

const AnalyticsPage = () => {
  return <ExpensesOverview />;
};

export default withPrivateGuard(AnalyticsPage);
