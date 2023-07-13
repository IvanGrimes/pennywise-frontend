import { SetPassword } from 'widgets/set-password';
import { withPublicGuard } from './utils/withPublicGuard.tsx';

const SetPasswordPage = () => <SetPassword />;

export default withPublicGuard(SetPasswordPage);
