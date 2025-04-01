import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from './context/ModalContext.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'
import 'modern-normalize/modern-normalize.css';
import './scss/main.scss';
import App from './App.tsx';
import { persistor, store } from './reduce/store.ts';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
    <BrowserRouter>
      <ModalProvider>
        <App />
    </ModalProvider>
    </BrowserRouter>
    </PersistGate>
    </Provider>
  </StrictMode>
)
