import { Route, Routes } from 'react-router';

import { Layout } from './components/Layout/Layout';
import { AdminPage } from './pages/AdminPage/AdminPage';
import { BasketPage } from './pages/BasketPage/BasketPage';
import { MainPage } from './pages/MainPage/MainPage';
import { ProductPage } from './pages/ProductPage/ProductPage';

export const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/products/:pid" element={<ProductPage />} />
        <Route path="basket" element={<BasketPage />} />
        <Route path="admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
};
