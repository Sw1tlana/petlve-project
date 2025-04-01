import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  import storage from "redux-persist/lib/storage";
  import { setupAxiosInterceptors } from './services/authServices';

  const authConfig = {
    key: "auth",
    storage,
    whitelist: ["token", "refreshToken"],
  };

  export const store = configureStore({
    reducer: {
      auth: persistReducer(authConfig, authReducer),
    },
    
     middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  
  setupAxiosInterceptors(store);

  export type RootState = ReturnType<typeof store.getState>;
  
  export const persistor = persistStore(store);