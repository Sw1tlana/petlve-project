import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from './context/ModalContext.tsx';
import 'modern-normalize/modern-normalize.css';
import './scss/main.scss';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ModalProvider>
        <App />
    </ModalProvider>
    </BrowserRouter>
  </StrictMode>
)
