import { useNavigate } from 'react-router';

import { ActionIcon, Indicator } from '@mantine/core';
import { BasketIcon } from '@phosphor-icons/react';

import { useAppSelector } from '../../hook';
import { getBasketOrderItems } from '../../slices/basketSlice/selectors';

export const BasketButton = () => {
  const navigate = useNavigate();
  const orderItems = useAppSelector(getBasketOrderItems);
  const orderItemCount = orderItems.length;

  return (
    <Indicator inline label={orderItemCount} maxValue={99} showZero={false}>
      <ActionIcon
        variant="outline"
        size="md"
        onClick={() => navigate('/basket')}
      >
        <BasketIcon style={{ width: '70%', height: '70%' }} />
      </ActionIcon>
    </Indicator>
  );
};
