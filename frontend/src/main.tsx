import '@mantine/core/styles.css';
import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import { MantineProvider } from '@mantine/core';

import { App } from './App';
import { store } from './store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <StoreProvider store={store}>
        <MantineProvider>
          <App />
        </MantineProvider>
      </StoreProvider>
    </BrowserRouter>
  </StrictMode>,
);
