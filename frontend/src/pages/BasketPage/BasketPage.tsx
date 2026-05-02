import { useState } from 'react';

import { Button, Textarea } from '@mantine/core';

import { BasketItemList } from '../../components/BasketItemList/BasketItemList';
import { useAppSelector } from '../../hook';
import {
  getBasketOrderAmount,
  getBasketOrderItems,
} from '../../slices/basketSlice/selectors';
import classes from './BasketPage.module.css';

export const BasketPage = () => {
  const orderAmount = useAppSelector(getBasketOrderAmount);
  const orderItems = useAppSelector(getBasketOrderItems);
  const hasNoOrders = orderItems.length === 0;

  const [address, setAddress] = useState('');

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <BasketItemList />
        <div className={classes.form}>
          <div
            className={classes.orderAmount}
          >{`Всего ${orderAmount} руб`}</div>
          <Textarea
            placeholder="Адрес доставки"
            disabled={hasNoOrders}
            value={address}
            onChange={(e) => setAddress(e.currentTarget.value)}
          />
          <div className={classes.orderButton}>
            <Button disabled={hasNoOrders || !address}>Заказать</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
