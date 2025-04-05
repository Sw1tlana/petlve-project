import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { friendsReducer } from "./friends/slice";

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

  const persistedAuthReducer = persistReducer(authConfig, authReducer);

  export const store = configureStore({
    reducer: {
      auth:  persistedAuthReducer,
      friends: friendsReducer
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
  export type AppDispatch = typeof store.dispatch;
 
  export const persistor = persistStore(store);