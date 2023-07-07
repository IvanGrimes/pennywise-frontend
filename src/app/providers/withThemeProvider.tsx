import { FunctionComponent } from 'react';
import { MantineProvider, TypographyStylesProvider } from 'shared/ui';

export const withThemeProvider = (Component: FunctionComponent) => {
  const WrappedComponent = () => (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <TypographyStylesProvider>
        <Component />
      </TypographyStylesProvider>
    </MantineProvider>
  );

  return WrappedComponent;
};
