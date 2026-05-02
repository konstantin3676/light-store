import { Outlet } from 'react-router';

import { Header } from '../Header/Header';
import classes from './Layout.module.css';

export const Layout = () => {
  return (
    <div className={classes.container}>
      <Header />
      <main className={classes.main}>
        <Outlet />
      </main>
    </div>
  );
};
