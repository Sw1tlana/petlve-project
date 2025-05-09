import { User } from "./slice";

interface AuthState {
  user: User | null;      
  email: string | null;
  avatar: string | null;   
  isLoggedIn: boolean;
  isRefreshing: boolean;
  error: string | null;
  }
  
  interface RootState {
    auth: AuthState;
  }

  export const selectUser = (state: RootState): User | null => state.auth.user;

    export const selectEmail = (state: RootState) => state.auth.email;

    export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

    export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;

    export const selectError = (state: RootState) => state.auth.error;
