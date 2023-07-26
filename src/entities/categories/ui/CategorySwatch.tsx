import { ColorSwatch, useMantineTheme } from 'shared/ui';
import { PropsWithChildren } from 'react';

export type CategorySwatchProps = PropsWithChildren<{
  color: string;
  onClick?: () => void;
  disabled?: boolean;
  component?: 'div' | 'button';
}>;

export const CategorySwatch = ({
  color,
  onClick,
  disabled,
  children,
  component = 'div',
}: CategorySwatchProps) => {
  const theme = useMantineTheme();

  return (
    <ColorSwatch
      type="button"
      sx={{
        color: '#fff',
        cursor: component === 'button' ? 'pointer' : 'default',

        '&:disabled': {
          cursor: 'not-allowed',
          filter: 'grayscale(100)',
        },
      }}
      color={theme.colors[color]?.[6]}
      onClick={onClick}
      component={component}
      disabled={disabled}
    >
      {children}
    </ColorSwatch>
  );
};
