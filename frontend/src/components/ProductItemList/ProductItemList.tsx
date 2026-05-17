import { useEffect, useState } from 'react';

import { useDisclosure } from '@mantine/hooks';

import { useAppDispatch, useAppSelector } from '../../hook';
import { getProducts } from '../../slices/productSlice/selectors';
import { fetchProducts } from '../../slices/productSlice/services/fetchProducts';
import { ProductEditorModal } from '../ProductEditorModal/ProductEditorModal';
import { ProductItem } from '../ProductItem/ProductItem';
import classes from './ProductItemList.module.css';

export const ProductItemList = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);

  const [opened, { open, close }] = useDisclosure(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={classes.container}>
      {products.map(({ id, name }) => (
        <ProductItem
          key={id}
          id={id}
          name={name}
          openEditor={() => {
            setEditingProductId(id);
            open();
          }}
        />
      ))}
      {editingProductId && (
        <ProductEditorModal
          opened={opened}
          editingProductId={editingProductId}
          onClose={() => {
            setEditingProductId(null);
            close();
          }}
        />
      )}
    </div>
  );
};
