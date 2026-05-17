import { ActionIcon } from '@mantine/core';
import { TrashIcon } from '@phosphor-icons/react';

import { useAppDispatch } from '../../hook';
import classes from './ProductItem.module.css';

import type { Product } from '../../slices/productSlice/types';

type Props = {
  id: Product['id'];
  name: Product['name'];
};

export const ProductItem = ({ id, name }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div className={classes.container}>
      <div className={classes.name}>{name}</div>
      <div>
        <ActionIcon
          variant="subtle"
          size="md"
          onClick={() => {
            // dispatch();
          }}
        >
          <TrashIcon style={{ width: '70%', height: '70%' }} />
        </ActionIcon>
      </div>
    </div>
  );
};
