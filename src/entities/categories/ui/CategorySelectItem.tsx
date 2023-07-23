import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { Group, Text } from 'shared/ui';
import { CategorySwatch } from './CategorySwatch';

export type CategorySelectItemProps = ComponentPropsWithoutRef<'div'> &
  CategorySelectItemOption;

export type CategorySelectItemOption = {
  value: string;
  label: string;
  color: string;
};

// eslint-disable-next-line react/display-name
export const CategorySelectItem = forwardRef<
  HTMLDivElement,
  CategorySelectItemProps
>(({ label, color, ...props }, ref) => (
  <div ref={ref} {...props}>
    <Group noWrap>
      <CategorySwatch color={color} />
      <Text size="sm">{label}</Text>
    </Group>
  </div>
));
