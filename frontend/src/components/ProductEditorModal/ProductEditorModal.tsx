import { Button, Group, Modal, NumberInput, Textarea, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';

import { useAppDispatch, useAppSelector } from '../../hook';
import { getProductById, getProductLoading } from '../../slices/productSlice/selectors';
import { createProduct } from '../../slices/productSlice/services/createProduct';
import { fetchProducts } from '../../slices/productSlice/services/fetchProducts';
import { updateProduct } from '../../slices/productSlice/services/updateProduct';

import type { Product } from '../../slices/productSlice/types';
const initialValues = {
  name: '',
  desc: '',
  sku: '',
  price: '0',
  stock: 0,
};

type Props = {
  opened: boolean;
  editingProductId: number;
  onClose: () => void;
};

export const ProductEditorModal = ({
  opened,
  editingProductId,
  onClose,
}: Props) => {
  const dispatch = useAppDispatch();
  const isNewProduct = editingProductId === 0;
  const getProductItemById = useAppSelector(getProductById);
  const product = getProductItemById[editingProductId];
  const loading = useAppSelector(getProductLoading);

  const form = useForm<Omit<Product, 'id'>>({
    mode: 'uncontrolled',
    initialValues: {
      ...(isNewProduct ? initialValues : product),
    },

    validate: {
      name: isNotEmpty(),
      sku: isNotEmpty(),
      price: isNotEmpty(),
      stock: isNotEmpty(),
    },
  });

  const onSubmit = (values: Omit<Product, 'id'>) => {
    if (isNewProduct) {
      dispatch(createProduct({ productData: values })).then(({ meta }) => {
        if (meta.requestStatus === 'fulfilled') {
          dispatch(fetchProducts());
          onClose();
        }
      });
    } else {
      dispatch(
        updateProduct({
          productId: editingProductId,
          productData: values,
        }),
      ).then(({ meta }) => {
        if (meta.requestStatus === 'fulfilled') {
          dispatch(fetchProducts());
          onClose();
        }
      });
    }
  };

  return (
    <Modal
      centered
      size="lg"
      opened={opened}
      onClose={onClose}
      title={isNewProduct ? 'Создание' : 'Редактирование'}
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          withAsterisk
          label="Наименование"
          key={form.key('name')}
          {...form.getInputProps('name')}
        />
        <Textarea
          autosize
          label="Описание"
          minRows={3}
          key={form.key('desc')}
          {...form.getInputProps('desc')}
        />
        <Group wrap="nowrap">
          <TextInput
            withAsterisk
            label="Артикул"
            key={form.key('sku')}
            {...form.getInputProps('sku')}
          />
          <NumberInput
            withAsterisk
            label="Цена"
            min={0}
            key={form.key('price')}
            {...form.getInputProps('price')}
          />
          <NumberInput
            withAsterisk
            label="Количество"
            min={0}
            key={form.key('stock')}
            {...form.getInputProps('stock')}
          />
        </Group>
        <Group mt="md" justify="flex-end">
          <Button type="submit" disabled={loading}>
            {isNewProduct ? 'Создать' : 'Сохранить'}
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
