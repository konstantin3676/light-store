import { useState } from 'react';

import { NativeSelect } from '@mantine/core';

import { useAppDispatch } from '../../hook';
import { fetchOrders } from '../../slices/orderSlice/services/fetchOrders';
import { updateOrder } from '../../slices/orderSlice/services/updateOrder';
import classes from './OrderItem.module.css';

import type { Order } from '../../slices/orderSlice/types';
import type { OrderStatus } from '../../slices/basketSlice/types';
type Props = {
  id: Order['id'];
  address: Order['address'];
  status: Order['status'];
};

export const OrderItem = ({ id, address, status }: Props) => {
  const dispatch = useAppDispatch();

  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(status);

  return (
    <div className={classes.container}>
      <div className={classes.address}>{address}</div>
      <div>
        <NativeSelect
          value={currentStatus}
          onChange={(e) => {
            const value = e.currentTarget.value as OrderStatus;
            setCurrentStatus(value);
            dispatch(
              updateOrder({
                orderId: id,
                orderData: { status: value },
              }),
            ).then(({ meta }) => {
              if (meta.requestStatus === 'fulfilled') {
                dispatch(fetchOrders());
              }
            });
          }}
          data={[
            'CREATED',
            'PAID',
            'PROCESSING',
            'SHIPPED',
            'DELIVERED',
            'CANCELLED',
            'RETURNED',
          ]}
        />
      </div>
    </div>
  );
};
