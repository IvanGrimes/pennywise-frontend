import { withProviders } from './providers';

import { Routing } from 'pages';

const Component = () => {
  return <Routing />;
};

export const App = withProviders(Component);
