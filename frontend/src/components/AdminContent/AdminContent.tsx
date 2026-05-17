import { useState } from 'react';

import { Tabs } from '@mantine/core';

import { ProductItemList } from '../ProductItemList/ProductItemList';

export const AdminContent = () => {
  const [activeTab, setActiveTab] = useState<string | null>('products');

  return (
    <Tabs value={activeTab} onChange={setActiveTab}>
      <Tabs.List>
        <Tabs.Tab value="products">Товары</Tabs.Tab>
        <Tabs.Tab value="orders">Заказы</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="products">
        <ProductItemList />
      </Tabs.Panel>
      <Tabs.Panel value="orders">Orders</Tabs.Panel>
    </Tabs>
  );
};
