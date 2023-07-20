import { Group, Title } from 'shared/ui';
import { CategorySwatch } from './CategorySwatch';

export type CategoryTitleProps = { name: string; color: string };

export const CategoryTitle = ({ name, color }: CategoryTitleProps) => (
  <Group>
    <CategorySwatch color={color} />
    <Title sx={{ margin: 0 }} order={5}>
      {name}
    </Title>
  </Group>
);
