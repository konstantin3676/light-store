import { useMemo, useState } from 'react';
import { Link } from 'react-router';

import { Anchor, Badge, List, NativeSelect } from '@mantine/core';

import { useAppDispatch, useAppSelector } from '../../hook';
import { fetchOrders } from '../../slices/orderSlice/services/fetchOrders';
import { updateOrder } from '../../slices/orderSlice/services/updateOrder';
import { getProductById } from '../../slices/productSlice/selectors';
import classes from './OrderItem.module.css';

import type { Order } from '../../slices/orderSlice/types';
import type { OrderStatus } from '../../slices/basketSlice/types';
type Props = {
  id: Order['id'];
  address: Order['address'];
  status: Order['status'];
  orderItems: Order['order_items'];
};

export const OrderItem = ({ id, address, status, orderItems }: Props) => {
  const dispatch = useAppDispatch();
  const getProductItemById = useAppSelector(getProductById);

  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(status);

  const totalPrice = useMemo(() => {
    return orderItems.reduce((acc, item) => {
      return acc + parseFloat(item.price_at_purchase);
    }, 0);
  }, [orderItems]);

  return (
    <div className={classes.container}>
      <div className={classes.addressContainer}>
        <div className={classes.address}>{address}</div>
        <div className={classes.selectContainer}>
          <Badge color="pink">{`${totalPrice.toFixed(2)} руб`}</Badge>
          <NativeSelect
            size="xs"
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
      <List size="sm" pl={10}>
        {orderItems.map(({ id, product_id, quantity }) => (
          <List.Item
            key={id}
            icon={<Badge size="xs">{`${quantity} шт`}</Badge>}
          >
            <Anchor
              component={Link}
              to={`/products/${product_id}`}
              underline="never"
              fz={14}
            >
              {getProductItemById[product_id]?.name}
            </Anchor>
          </List.Item>
        ))}
      </List>
    </div>
  );
};
