interface AuthState {
    user: string | null;
    email: string | null;
    isLoggedIn: boolean;
    isRefreshing: boolean;
    error: string | null;
  }
  
  interface RootState {
    auth: AuthState;
  }

    export const selectUser = (state: RootState) => state.auth.user;

    export const selectEmail = (state: RootState) => state.auth.email;

    export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
    console.log("Logged In:", selectIsLoggedIn);


    export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;

    export const selectError = (state: RootState) => state.auth.error;
