import { FunctionComponent } from 'react';
import { MantineProvider } from 'shared/ui';

export const withThemeProvider = (Component: FunctionComponent) => {
  const WrappedComponent = () => (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Component />
    </MantineProvider>
  );

  return WrappedComponent;
};
