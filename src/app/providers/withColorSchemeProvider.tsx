import { FunctionComponent } from 'react';
import { ColorSchemeProvider } from 'features/theme/toggle-theme';

export const withColorSchemeProvider = (Component: FunctionComponent) => {
  const WrappedComponent = () => (
    <ColorSchemeProvider>
      <Component />
    </ColorSchemeProvider>
  );

  return WrappedComponent;
};
