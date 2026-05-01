import { Route, Routes } from 'react-router';

import classes from './App.module.css';
import { Header } from './components/Header/Header';
import { AdminPage } from './pages/AdminPage/AdminPage';
import { MainPage } from './pages/MainPage/MainPage';

export const App = () => {
  return (
    <div className={classes.container}>
      <Header />
      <main className={classes.main}>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path="admin" element={<AdminPage />} />
        </Routes>
      </main>
    </div>
  );
};
