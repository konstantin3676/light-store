import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { Alert, Anchor, Button, Textarea } from '@mantine/core';
import { HeartIcon } from '@phosphor-icons/react';

import { BasketItemList } from '../../components/BasketItemList/BasketItemList';
import { useAppDispatch, useAppSelector } from '../../hook';
import { basketActions } from '../../slices/basketSlice/basketSlice';
import {
  getBasketOrderAmount,
  getBasketOrderItems,
  getBasketOrderLoading,
  getBasketShouldShowSuccessAlert,
} from '../../slices/basketSlice/selectors';
import { createOrder } from '../../slices/basketSlice/services/createOrder';
import classes from './BasketPage.module.css';

export const BasketPage = () => {
  const dispatch = useAppDispatch();
  const orderAmount = useAppSelector(getBasketOrderAmount);
  const orderItems = useAppSelector(getBasketOrderItems);
  const orderLoading = useAppSelector(getBasketOrderLoading);
  const shouldShowSuccessAlert = useAppSelector(
    getBasketShouldShowSuccessAlert,
  );
  const hasNoOrders = orderItems.length === 0;

  const [address, setAddress] = useState('');

  useEffect(() => {
    return () => {
      dispatch(basketActions.setShouldShowSuccessAlert(false));
    };
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        {shouldShowSuccessAlert ? (
          <div className={classes.alertContainer}>
            <div className={classes.alertWrapper}>
              <Alert
                variant="light"
                color="blue"
                title="Заказ принят"
                icon={<HeartIcon />}
                styles={{ title: { fontSize: '16px' } }}
              />
              <Anchor
                component={Link}
                to="/"
                underline="never"
                className={classes.title}
              >
                На главную
              </Anchor>
            </div>
          </div>
        ) : (
          <>
            <BasketItemList />
            <div className={classes.form}>
              <div
                className={classes.orderAmount}
              >{`Всего ${orderAmount.toFixed(2)} руб`}</div>
              <Textarea
                placeholder="Адрес доставки"
                disabled={hasNoOrders}
                value={address}
                onChange={(e) => setAddress(e.currentTarget.value)}
              />
              <div className={classes.orderButton}>
                <Button
                  disabled={hasNoOrders || !address}
                  loading={orderLoading}
                  onClick={() => {
                    dispatch(createOrder({ address }));
                  }}
                >
                  Заказать
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
