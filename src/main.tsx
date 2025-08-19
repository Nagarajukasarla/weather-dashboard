import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import AppLayout from './components/layouts/AppLayout.tsx';
import './index.css';
import store from './state';
import './utils/leafletIconConfig.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppLayout />
    </Provider>
  </StrictMode>,
)
