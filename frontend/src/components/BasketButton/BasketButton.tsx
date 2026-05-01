import { ActionIcon, Indicator } from '@mantine/core';
import { BasketIcon } from '@phosphor-icons/react';

export const BasketButton = () => {
  return (
    <Indicator inline label={3} maxValue={99}>
      <ActionIcon variant="outline" size="md">
        <BasketIcon style={{ width: '70%', height: '70%' }} />
      </ActionIcon>
    </Indicator>
  );
};
