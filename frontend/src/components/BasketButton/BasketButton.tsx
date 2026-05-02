import { Link } from 'react-router';

import { ActionIcon, Indicator } from '@mantine/core';
import { BasketIcon } from '@phosphor-icons/react';

import { useAppSelector } from '../../hook';
import { getBasketOrderItems } from '../../slices/basketSlice/selectors';

export const BasketButton = () => {
  const orderItems = useAppSelector(getBasketOrderItems);
  const orderItemCount = orderItems.length;

  return (
    <Indicator inline label={orderItemCount} maxValue={99} showZero={false}>
      <ActionIcon component={Link} to="/basket" variant="outline" size="md">
        <BasketIcon style={{ width: '70%', height: '70%' }} />
      </ActionIcon>
    </Indicator>
  );
};
