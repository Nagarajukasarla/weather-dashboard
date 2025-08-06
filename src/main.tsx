import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppLayout from './components/layouts/AppLayout.tsx';
import { Provider } from 'react-redux';
import store from './state';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppLayout />
    </Provider>
  </StrictMode>,
)
