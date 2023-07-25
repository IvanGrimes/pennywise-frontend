import { categoriesApi, type GetCategoriesResponseDto } from 'shared/api';
import { DefaultMantineColor } from 'shared/ui';

export type CategoryColor = DefaultMantineColor;

export const categoryColorKeys: CategoryColor[] = [
  'blue',
  'cyan',
  'dark',
  'red',
  'gray',
  'grape',
  'green',
  'indigo',
  'lime',
  'orange',
  'pink',
  'teal',
  'violet',
  'yellow',
];

export const categoryColor = categoryColorKeys.reduce((acc, color) => {
  acc[color] = color;

  return acc;
}, {} as Record<CategoryColor, CategoryColor>);

export { categoriesApi as api, type GetCategoriesResponseDto };
