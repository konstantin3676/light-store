import { ActionIcon, Indicator } from '@mantine/core';
import { BasketIcon } from '@phosphor-icons/react';

import { useAppSelector } from '../../hook';
import { getBasketOrderItems } from '../../slices/basketSlice/selectors';

export const BasketButton = () => {
  const orderItems = useAppSelector(getBasketOrderItems);

  return (
    <Indicator inline label={orderItems.length} maxValue={99} showZero={false}>
      <ActionIcon variant="outline" size="md">
        <BasketIcon style={{ width: '70%', height: '70%' }} />
      </ActionIcon>
    </Indicator>
  );
};
