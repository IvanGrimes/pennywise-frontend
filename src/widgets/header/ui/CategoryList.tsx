import { categoriesModel, CategoryTitle } from 'entities/categories';
import { UserDropdownItem } from 'entities/viewer';
import {
  OpenAddCategoryModalButton,
  AddCategoryModal,
} from 'features/categories/add-category-modal';
import {
  DeleteCategoryModal,
  OpenDeleteCategoryModalButton,
} from 'features/categories/delete-category-modal';
import { Fragment, useRef, useState } from 'react';
import { useModal } from 'shared/hooks';
import { IconTag } from 'shared/icons';
import {
  Button,
  FetchError,
  Modal,
  Group,
  Box,
  Flex,
  Divider,
} from 'shared/ui';
import { CategoryDetails } from './CategoryDetails';

export const CategoryList = () => {
  const modal = useModal();
  const [category, setCategory] =
    useState<categoriesModel.GetCategoriesResponseDto | null>(null);
  const categories = categoriesModel.api.useGetCategoriesQuery();
  const categoryDetailsModal = useModal();
  const wasOpenedRef = useRef(false);
  const handleOpen = () => {
    wasOpenedRef.current = true;
    modal.open();
  };
  const handleClose = () => {
    wasOpenedRef.current = false;
    modal.close();
  };
  const handleOpenCategoryDetailsModal =
    (nextCategory: categoriesModel.GetCategoriesResponseDto) => () => {
      setCategory(nextCategory);
      modal.close();
      categoryDetailsModal.open();
    };
  const handleCloseCategoryDetailsModal = () => {
    modal.open();
    categoryDetailsModal.close();
  };
  const getContent = () => {
    if (categories.currentData) {
      return (
        <Flex direction="column" w="50%">
          {categories.currentData.map((item) => {
            const { name, color } = item;

            return (
              <Fragment key={name + color}>
                <Button
                  sx={{
                    padding: '0 8px',
                    '&& .mantine-Button-inner': {
                      justifyContent: 'flex-start',
                    },
                  }}
                  variant="subtle"
                  color="dark"
                  onClick={handleOpenCategoryDetailsModal(item)}
                >
                  <CategoryTitle name={name} color={color} />
                </Button>
                <Divider />
              </Fragment>
            );
          })}
        </Flex>
      );
    }
    if (categories.error) {
      return (
        <FetchError onRetry={categories.refetch}>
          Couldn&apos;t retrieve categories
        </FetchError>
      );
    }

    // @todo: add skeleton
    return <div>loading</div>;
  };

  return (
    <>
      <Modal title="Categories" opened={modal.opened} onClose={handleClose}>
        <Group position="right">
          <OpenAddCategoryModalButton onOpen={modal.close} />
        </Group>
        <Box mt={8}>{getContent()}</Box>
      </Modal>
      <AddCategoryModal
        onClose={wasOpenedRef.current ? modal.open : undefined}
      />
      {category && (
        <>
          <CategoryDetails
            opened={categoryDetailsModal.opened}
            onClose={handleCloseCategoryDetailsModal}
            category={category}
            bottomSlot={
              <OpenDeleteCategoryModalButton
                onOpen={categoryDetailsModal.close}
              />
            }
          />
          <DeleteCategoryModal
            id={category.id}
            onSuccess={modal.open}
            onClose={categoryDetailsModal.open}
          />
        </>
      )}

      <UserDropdownItem Icon={IconTag} onClick={handleOpen}>
        Categories
      </UserDropdownItem>
    </>
  );
};
