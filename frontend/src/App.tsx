import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { Layout } from './components/Layout/Layout';
import { useAppDispatch } from './hook';
import { AdminPage } from './pages/AdminPage/AdminPage';
import { BasketPage } from './pages/BasketPage/BasketPage';
import { MainPage } from './pages/MainPage/MainPage';
import { ProductPage } from './pages/ProductPage/ProductPage';
import { userActions } from './slices/userSlice/userSlice';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/products/:pid" element={<ProductPage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route
          path="/admin"
          element={<Navigate to="/admin/products" replace />}
        />
        <Route path="/admin/:tab" element={<AdminPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
