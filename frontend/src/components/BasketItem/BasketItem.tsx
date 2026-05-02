import { ActionIcon } from '@mantine/core';
import { MinusIcon, PlusIcon, TrashIcon } from '@phosphor-icons/react';

import { useAppDispatch, useAppSelector } from '../../hook';
import { basketActions } from '../../slices/basketSlice/basketSlice';
import { getBasketOrderItems } from '../../slices/basketSlice/selectors';
import classes from './BasketItem.module.css';

import type { OrderItem } from '../../slices/basketSlice/types';
type Props = {
  id: OrderItem['productId'];
  name: OrderItem['name'];
  quantity: OrderItem['quantity'];
  priceAtPurchase: OrderItem['priceAtPurchase'];
};

export const BasketItem = ({ id, name, quantity, priceAtPurchase }: Props) => {
  const dispatch = useAppDispatch();
  const orderItems = useAppSelector(getBasketOrderItems);

  return (
    <div className={classes.container}>
      <div className={classes.name}>{name}</div>
      <div className={classes.quantity}>
        <ActionIcon
          variant="subtle"
          size="md"
          disabled={quantity === 1}
          onClick={() => {
            dispatch(
              basketActions.changeOrderItemQuantity({
                productId: id,
                quantity: quantity - 1,
              }),
            );
          }}
        >
          <MinusIcon style={{ width: '70%', height: '70%' }} />
        </ActionIcon>
        <div>{quantity}</div>
        <ActionIcon
          variant="subtle"
          size="md"
          onClick={() => {
            dispatch(
              basketActions.changeOrderItemQuantity({
                productId: id,
                quantity: quantity + 1,
              }),
            );
          }}
        >
          <PlusIcon style={{ width: '70%', height: '70%' }} />
        </ActionIcon>
      </div>
      <div className={classes.priceAtPurchase}>{`${priceAtPurchase} руб`}</div>
      <div>
        <ActionIcon
          variant="subtle"
          size="md"
          onClick={() => {
            dispatch(
              basketActions.setOrderItems(
                orderItems.filter(({ productId }) => productId !== id),
              ),
            );
          }}
        >
          <TrashIcon style={{ width: '70%', height: '70%' }} />
        </ActionIcon>
      </div>
    </div>
  );
};
