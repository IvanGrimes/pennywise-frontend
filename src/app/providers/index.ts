import compose from 'compose-function';
import { withRouter } from './withRouter';
import { withMantineProviders } from './withMantineProviders';
import { withNotifications } from './withNotifications';
import { withStore } from './withStore';
import { withColorSchemeProvider } from './withColorSchemeProvider';

export const withProviders = compose(
  withStore,
  withRouter,
  withColorSchemeProvider,
  withMantineProviders,
  withNotifications
);
