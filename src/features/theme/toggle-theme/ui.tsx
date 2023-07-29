import { Switch, useMantineTheme } from 'shared/ui';
import { IconSun, IconMoonStars } from 'shared/icons';
import { useColorScheme } from './lib';

export function ToggleThemeSwitch() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const theme = useMantineTheme();

  return (
    <Switch
      checked={colorScheme === 'dark'}
      onChange={() => toggleColorScheme()}
      size="lg"
      onLabel={<IconSun color={theme.white} size="1.25rem" stroke={1.5} />}
      offLabel={
        <IconMoonStars
          color={theme.colors.gray[6]}
          size="1.25rem"
          stroke={1.5}
        />
      }
    />
  );
}
