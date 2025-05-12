import { configureStore } from "@reduxjs/toolkit";
import { authReducer, AuthState } from "./auth/slice";
import { friendsReducer } from "./friends/slice";
import { newsReducer } from "./news/slice";
import { noticesReducer } from "./notices/slice";
import { createTransform } from 'redux-persist';


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

  const authTransform = createTransform<AuthState, Partial<AuthState>>(
  (inboundState) => {
    // перед записом у localStorage
    return {
      token: inboundState.token,
      refreshToken: inboundState.refreshToken,
      avatar: inboundState.avatar,
      user: inboundState.user,
    };
  },
  (outboundState) => {
    // при читанні з localStorage
    return {
      ...outboundState,
      user: null, // краще явно скинути
      isLoggedIn: !!outboundState?.token,
      rehydrated: true,
    } as AuthState;
  },
  { whitelist: ['auth'] }
);

  const authConfig = {
    key: "auth",
    storage,
    whitelist: ["token", "refreshToken", "avatar", "user"],
    transforms: [authTransform],
  };

  const persistedAuthReducer = persistReducer(authConfig, authReducer);

  export const store = configureStore({
    reducer: {
      auth:  persistedAuthReducer,
      friends: friendsReducer,
      news: newsReducer,
      notices: noticesReducer
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