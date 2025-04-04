import { toast } from 'react-hot-toast';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signUpUser, signInUser, refreshTokenUser, logoutUser } from './operations';

const INITIAL_STATE: State = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  refreshToken: null,
  isLoggedIn: false,
  error: null,  
  isRefreshing: false,
  loading: false,  
};

interface SignUpResponse {
  user: { 
    id: string; 
    name: string | null;
    email: string;
 }; 
  token: string;
  refreshToken: string;
}

interface State {
  user: {
    name: string | null;
    email: string | null;
  };
  token: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  error: boolean | null;
  isRefreshing: boolean;
  loading: boolean;  
}

export const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,  
  reducers: {
    setToken(state, action: PayloadAction<{ token: string; refreshToken: string }>) {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(signUpUser.pending, (state) => {
        state.loading = true;  
        state.error = null; 
      })
      .addCase(signUpUser.fulfilled, (state, action: PayloadAction<SignUpResponse>) => {
        console.log("Data from fulfilled:", action.payload);
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.loading = false;  
        state.error = null;
        toast.success('Register successful');
      })
      .addCase(signUpUser.rejected, (state) => {
        state.loading = false;  
        state.error = true; 
        toast.error('Registration failed');
      })
      .addCase(signInUser.pending, (state) => {
        state.loading = true;  
        state.error = null; 
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
        toast.success('Login successful');
      })
      .addCase(signInUser.rejected, (state) => {
        state.loading = false;  
        state.error = true; 
        toast.error('Registration failed');
      })
      .addCase(refreshTokenUser.pending, (state) => {
        state.isRefreshing = true;
        state.error = false; 
      })
      .addCase(refreshTokenUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isRefreshing = false;
        toast.success('Login successful');
      })
      .addCase(refreshTokenUser.rejected, (state) => {
        state.token = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.error = false;
        state.isRefreshing = false; 
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = INITIAL_STATE.user;
        state.token = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
        toast.success('Logout successful');
      })
      .addCase(logoutUser.rejected, (state) => {
        state.error = true;
        toast.error('Incorrect email or password');
      });
  },
});

export const { setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
