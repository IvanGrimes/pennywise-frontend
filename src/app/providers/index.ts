import compose from 'compose-function';
import { withRouter } from './withRouter';
import { withAuth } from './withAuth';
import { withThemeProvider } from './withThemeProvider';
import { withNotifications } from './withNotifications';

export const withProviders = compose(
  withRouter,
  withAuth,
  withThemeProvider,
  withNotifications
);
