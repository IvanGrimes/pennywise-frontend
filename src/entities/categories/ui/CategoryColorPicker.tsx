import { rem, Group, Box } from 'shared/ui';
import { CheckIcon } from 'shared/icons';
import { CategorySwatch } from './CategorySwatch';
import { CategoryColor, categoryColorKeys } from '../model';

export type CategoryColorPickerProps = {
  value: CategoryColor;
  onChange: (value: CategoryColor) => void;
  disabled?: boolean;
};

export const CategoryColorPicker = ({
  disabled,
  value,
  onChange,
  ...props
}: CategoryColorPickerProps) => {
  const swatches = categoryColorKeys.map((color) => (
    <CategorySwatch
      key={color}
      color={color}
      onClick={() => onChange(color)}
      disabled={disabled}
      component="button"
    >
      {value === color && <CheckIcon width={rem(10)} />}
    </CategorySwatch>
  ));

  return (
    <Group spacing="xs">
      {swatches}
      <Box
        sx={{ display: 'none', visibility: 'hidden' }}
        type="radio"
        value={value}
        component="input"
        {...props}
      />
    </Group>
  );
};
