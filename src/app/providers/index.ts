import compose from 'compose-function';
import { withRouter } from './withRouter';
import { withThemeProvider } from './withThemeProvider';
import { withNotifications } from './withNotifications';
import { withStore } from './withStore';

export const withProviders = compose(
  withStore,
  withRouter,
  withThemeProvider,
  withNotifications
);
