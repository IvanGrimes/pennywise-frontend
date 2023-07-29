import { PropsWithChildren } from 'react';
import { useLocalStorage, useHotkeys } from 'shared/hooks';
import {
  ColorSchemeProvider as BaseColorSchemeProvider,
  ColorScheme,
  useMantineColorScheme as useColorScheme,
} from 'shared/ui';

export type ColorSchemeProviderProps = PropsWithChildren;

export { useColorScheme };

export const ColorSchemeProvider = ({ children }: ColorSchemeProviderProps) => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <BaseColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      {children}
    </BaseColorSchemeProvider>
  );
};
