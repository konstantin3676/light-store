import { ActionIcon } from '@mantine/core';
import { TrashIcon } from '@phosphor-icons/react';

import { useAppDispatch, useAppSelector } from '../../hook';
import { getProductLoading } from '../../slices/productSlice/selectors';
import { deleteProduct } from '../../slices/productSlice/services/deleteProduct';
import { fetchProducts } from '../../slices/productSlice/services/fetchProducts';
import classes from './ProductItem.module.css';

import type { Product } from '../../slices/productSlice/types';
type Props = {
  id: Product['id'];
  name: Product['name'];
};

export const ProductItem = ({ id, name }: Props) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(getProductLoading);

  return (
    <div className={classes.container}>
      <div className={classes.name}>{name}</div>
      <div>
        <ActionIcon
          variant="subtle"
          size="md"
          disabled={loading}
          onClick={() => {
            dispatch(deleteProduct(id)).then(({ meta }) => {
              if (meta.requestStatus === 'fulfilled') {
                dispatch(fetchProducts());
              }
            });
          }}
        >
          <TrashIcon style={{ width: '70%', height: '70%' }} />
        </ActionIcon>
      </div>
    </div>
  );
};
