import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { Group, Text } from 'shared/ui';

export type AccountSelectItemProps = ComponentPropsWithoutRef<'div'> &
  AccountSelectItemOption;

export type AccountSelectItemOption = {
  value: string;
  label: string;
  description: string;
};

// eslint-disable-next-line react/display-name
export const AccountSelectItem = forwardRef<
  HTMLDivElement,
  AccountSelectItemProps
>(({ label, description, ...props }, ref) => (
  <div ref={ref} {...props}>
    <Group position="apart" noWrap>
      <Text size="sm">{label}</Text>
      <Text size="sm">{description}</Text>
    </Group>
  </div>
));
