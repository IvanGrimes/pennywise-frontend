import { useColorScheme } from 'features/theme/toggle-theme';
import { FunctionComponent } from 'react';
import { DatesProvider } from 'shared/dates';
import { MantineProvider, TypographyStylesProvider } from 'shared/ui';
import 'dayjs/locale/ru';

export const withMantineProviders = (Component: FunctionComponent) => {
  const WrappedComponent = () => {
    const { colorScheme } = useColorScheme();

    return (
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <TypographyStylesProvider>
          <DatesProvider
            settings={{ locale: 'ru', firstDayOfWeek: 0, weekendDays: [0] }}
          >
            <Component />
          </DatesProvider>
        </TypographyStylesProvider>
      </MantineProvider>
    );
  };

  return WrappedComponent;
};
