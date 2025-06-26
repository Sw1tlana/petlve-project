import { configureStore } from "@reduxjs/toolkit";
import { authReducer, State } from "./auth/slice";
import { friendsReducer } from "./friends/slice";
import { newsReducer } from "./news/slice";
import { noticesReducer, NoticesState } from "./notices/slice";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

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
  import { setAuthHeader, setupAxiosInterceptors } from './services/authServices';

  const authConfig = {
    key: "auth",
    storage,
    whitelist: [
            "token", 
            "refreshToken", 
            "user", 
            "isLoggedIn",
            "pets"
    ],
    stateReconciler: autoMergeLevel2,
  };

    const noticesConfig = {
      key: "notices", 
      storage,
      whitelist: ["viewedItems", "favoritePets"],
      stateReconciler: autoMergeLevel2,
    };

  const persistedAuthReducer = persistReducer<State>(authConfig, authReducer);
  const persistedNoticesReducer = persistReducer<NoticesState>(noticesConfig, noticesReducer);

  export const store = configureStore({
    reducer: {
      auth:  persistedAuthReducer,
      friends: friendsReducer,
      news: newsReducer,
      notices: persistedNoticesReducer
    },
    
     middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  
export const persistor = persistStore(store);

persistor.subscribe(() => {
  const { token } = store.getState().auth;
  if (token) {
    setAuthHeader(token);
  }
  setupAxiosInterceptors(store);
});

  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
 