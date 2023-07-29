import { PropsWithChildren, useState } from 'react';
import {
  ColorSchemeProvider as BaseColorSchemeProvider,
  ColorScheme,
  useMantineColorScheme as useColorScheme,
} from 'shared/ui';

export type ColorSchemeProviderProps = PropsWithChildren;

export { useColorScheme };

export const ColorSchemeProvider = ({ children }: ColorSchemeProviderProps) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <BaseColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      {children}
    </BaseColorSchemeProvider>
  );
};
