import { useNavigate, useParams } from 'react-router';

import { Tabs } from '@mantine/core';

import { LoginForm } from '../../components/LoginForm/LoginForm';
import { OrderItemList } from '../../components/OrderItemList/OrderItemList';
import { ProductItemList } from '../../components/ProductItemList/ProductItemList';
import { useAppSelector } from '../../hook';
import { getUserAuthData, getUserInited } from '../../slices/userSlice/selectors';
import classes from './AdminPage.module.css';

export const AdminPage = () => {
  const navigate = useNavigate();
  const { tab } = useParams();
  const authData = useAppSelector(getUserAuthData);
  const inited = useAppSelector(getUserInited);

  if (!inited || (tab && !['products', 'orders'].includes(tab))) return null;

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        {authData?.access_token ? (
          <Tabs value={tab} onChange={(value) => navigate(`/admin/${value}`)}>
            <Tabs.List>
              <Tabs.Tab value="products">Товары</Tabs.Tab>
              <Tabs.Tab value="orders">Заказы</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="products">
              <ProductItemList />
            </Tabs.Panel>
            <Tabs.Panel value="orders">
              <OrderItemList />
            </Tabs.Panel>
          </Tabs>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};
