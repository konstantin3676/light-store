import { Link } from 'react-router';

import { ActionIcon, Anchor } from '@mantine/core';
import { SignOutIcon } from '@phosphor-icons/react';

import { useAppDispatch, useAppSelector } from '../../hook';
import {
  getUserAuthData,
  getUserInited,
} from '../../slices/userSlice/selectors';
import { userActions } from '../../slices/userSlice/userSlice';
import { BasketButton } from '../BasketButton/BasketButton';
import classes from './Header.module.css';

export const Header = () => {
  const dispatch = useAppDispatch();
  const authData = useAppSelector(getUserAuthData);
  const inited = useAppSelector(getUserInited);

  return (
    <header className={classes.header}>
      <Anchor
        component={Link}
        to="/"
        underline="never"
        className={classes.title}
      >
        Магазин лампочек
      </Anchor>
      <div className={classes.buttonContainer}>
        <BasketButton />
        {inited && authData?.access_token && (
          <ActionIcon
            variant="outline"
            size="md"
            onClick={() => {
              dispatch(userActions.logout());
            }}
          >
            <SignOutIcon style={{ width: '70%', height: '70%' }} />
          </ActionIcon>
        )}
      </div>
    </header>
  );
};
