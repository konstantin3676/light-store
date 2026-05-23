import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../hook';
import { getOrders } from '../../slices/orderSlice/selectors';
import { fetchOrders } from '../../slices/orderSlice/services/fetchOrders';
import { OrderItem } from '../OrderItem/OrderItem';
import classes from './OrderItemList.module.css';

export const OrderItemList = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getOrders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className={classes.container}>
      {orders.map(({ id, address, status, order_items: orderItems }) => (
        <OrderItem
          key={id}
          id={id}
          address={address}
          status={status}
          orderItems={orderItems}
        />
      ))}
    </div>
  );
};
