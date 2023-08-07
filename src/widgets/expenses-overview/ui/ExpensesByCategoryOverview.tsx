import { accountsModel } from 'entities/accounts';
import { analyticsModel, CategoryExpensesOverview } from 'entities/analytics';
import { viewerModel } from 'entities/viewer';
import { MouseEvent as ReactMouseEvent, useRef, useState } from 'react';
import { Box, useMantineTheme } from 'shared/ui';
import { assertIsNode } from 'shared/asserts';

export type ExpensesByCategoryOverviewProps = {
  data: analyticsModel.GetExpensesByCategoriesResponseDto[];
};

export const ExpensesByCategoryOverview = ({
  data,
}: ExpensesByCategoryOverviewProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const me = viewerModel.api.useMeQuery();
  const theme = useMantineTheme();
  const currencySymbol = me.currentData
    ? accountsModel.currencySymbol[me.currentData.mainCurrency]
    : '';
  const mappedData = data.map((item) => ({
    ...item,
    category: {
      ...item.category,
      color: theme.colors[item.category.color]?.[6],
    },
  }));
  const getAmount = () => {
    if (selectedCategoryId) {
      return (
        data.find((item) => item.category.id === selectedCategoryId)?.amount ??
        0
      );
    }

    return data.reduce((acc, item) => acc + item.amount, 0);
  };
  const handleSectionClick = (
    expense: analyticsModel.GetExpensesByCategoriesResponseDto,
    ev: ReactMouseEvent<SVGCircleElement>
  ) => {
    const target = ev.currentTarget;

    if (!target.parentNode) return;

    const sections = Array.from(target.parentNode.children) as HTMLElement[];

    if (selectedCategoryId) {
      sections.forEach((item) => {
        item.style.opacity = '1';
      });
    }

    setSelectedCategoryId(expense.category.id);

    sections.forEach((item) => {
      if (item.isEqualNode(target)) return;

      item.style.opacity = '0.25';
    });

    const handleClick = (ev1: MouseEvent) => {
      const container = containerRef.current;

      assertIsNode(ev1.target);

      if (container && container.contains(ev1.target)) return;

      setSelectedCategoryId(null);

      sections.forEach((item) => {
        item.style.opacity = '1';
      });

      document.removeEventListener('click', handleClick);
    };

    document.addEventListener('click', handleClick);
  };

  return (
    <Box ref={containerRef} sx={{ position: 'relative' }}>
      <CategoryExpensesOverview
        amount={getAmount()}
        currencySymbol={currencySymbol}
        data={mappedData}
        onSectionClick={handleSectionClick}
      />
    </Box>
  );
};
