import { Route, Routes } from 'react-router';

import { AdminPage } from './pages/AdminPage/AdminPage';
import { MainPage } from './pages/MainPage/MainPage';

export const App = () => {
  return (
    <Routes>
      <Route index element={<MainPage />} />
      <Route path="admin" element={<AdminPage />} />
    </Routes>
  );
};
