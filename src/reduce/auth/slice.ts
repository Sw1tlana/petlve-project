import { toast } from 'react-hot-toast';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signUpUser } from './operations';

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

interface SignupResponse {
  user: { 
    id: string; 
    name: string; 
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
      .addCase(signUpUser.fulfilled, (state, action: PayloadAction<SignupResponse>) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.loading = false;  
        state.error = null;
        toast.success('Register successful');
      })
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;  
        state.error = null; 
      })
      .addCase(signUpUser.rejected, (state) => {
        state.loading = false;  
        state.error = true; 
        toast.error('Registration failed');
      });
  },
});

export const { setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
