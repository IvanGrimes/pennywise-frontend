import { useMantineTheme, Group, Box } from '@mantine/core';
import { useState } from 'react';
import { rem } from 'shared/ui';
import { CheckIcon } from 'shared/icons';
import { CategorySwatch } from './CategorySwatch';

export type CategoryColorPickerProps = ReturnType<
  typeof useCategoryColorPicker
> & { name: string; disabled?: boolean };

export const useCategoryColorPicker = () => {
  const theme = useMantineTheme();
  const colorKeys = Object.keys(theme.colors);
  const initialState = colorKeys[0];
  const [selected, setSelected] = useState(initialState);
  const handleSelect = (color: string) => setSelected(color);
  const handleReset = () => {
    setSelected(initialState);

    return initialState;
  };

  return {
    selected,
    onSelect: handleSelect,
    reset: handleReset,
  };
};

export const CategoryColorPicker = ({
  selected,
  onSelect,
  name,
  disabled,
}: CategoryColorPickerProps) => {
  const theme = useMantineTheme();
  const colorKeys = Object.keys(theme.colors);
  const swatches = colorKeys.map((color) => (
    <CategorySwatch
      key={color}
      color={color}
      onClick={() => onSelect(color)}
      disabled={disabled}
      component="button"
    >
      {selected === color && <CheckIcon width={rem(10)} />}
    </CategorySwatch>
  ));

  return (
    <Group spacing="xs">
      {swatches}
      <Box
        sx={{ display: 'none', visibility: 'hidden' }}
        type="radio"
        name={name}
        value={selected}
        component="input"
      />
    </Group>
  );
};
