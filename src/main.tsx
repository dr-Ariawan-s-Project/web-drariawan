import ReactDOM from 'react-dom/client';
import React from 'react';

import { Toaster } from '@/components/ui/toaster';
import App from '@/routes';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>
);
