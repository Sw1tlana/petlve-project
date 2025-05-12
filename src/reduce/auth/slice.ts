import { toast } from 'react-hot-toast';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signUpUser, 
          signInUser, 
          refreshTokenUser, 
          logoutUser, 
          SignUpResponse,
          RefreshTokenResponse,
          userCurrentEdit,
          EditUserResponse
      } from './operations';

export interface AuthState extends State {
  version: number;
  rehydrated: boolean;
}

export interface User {
  _id?: string;
  name: string | null;
  email: string | null;
  phone?: string;
  photoUrl?: string | null;
  avatar?: string | null; 
}

const INITIAL_STATE: AuthState = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  refreshToken: null,
  avatar: null,
  isLoggedIn: false,
  error: null,  
  isRefreshing: false,
  loading: false,
  version: 0,  
  rehydrated: false,  
};

const parseStringified = <T>(data: T | string): T => {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch {
      return data as T;
    }
  }
  return data;
};

interface State {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  error: boolean | null;
  avatar: string | null;
  isRefreshing: boolean;
  loading: boolean;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,  
  reducers: {
    setToken(state, action: PayloadAction<{ token: string | null; refreshToken: string | null }>) {
      console.log('Setting token:', action.payload);
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
    setRehydrated(state) {
    console.log("State rehydrated.");
    state.rehydrated = true;
  }
  },
  extraReducers: (builder) => {
    builder
    .addCase(signUpUser.pending, (state) => {
        state.loading = true;  
        state.error = null; 
      })
      .addCase(signUpUser.fulfilled, (state, action: PayloadAction<SignUpResponse>) => {
        const user = parseStringified(action.payload.user) as User;
        state.user = user;
        state.token = action.payload.token?.replace(/^"|"$/g, '') || null;
        state.refreshToken = action.payload.refreshToken?.replace(/^"|"$/g, '') || null;
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
         console.log('signInUser.fulfilled', action.payload);
        const user = parseStringified(action.payload.user) as User;
        state.user = user;
        state.token = action.payload.token?.replace(/^"|"$/g, '') || null;
        state.refreshToken = action.payload.refreshToken?.replace(/^"|"$/g, '') || null;
        state.avatar = user?.avatar || null;
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
      .addCase(refreshTokenUser.fulfilled, (state, action: PayloadAction<RefreshTokenResponse>) => {
        console.log('refresh:', action.payload); 
        const { token, refreshToken } = action.payload;
        state.token = token;
        state.refreshToken = refreshToken;
        state.isRefreshing = false;
        toast.success('RefreshToken successful');
      })
      .addCase(refreshTokenUser.rejected, (state) => {
        state.token = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
      })
      .addCase(userCurrentEdit.pending, (state) => {
        state.error = false;
        state.isRefreshing = false;
      })
      .addCase(userCurrentEdit.fulfilled, (state, action: PayloadAction<EditUserResponse>) => {
         const userData = action.payload.data?.user;
        if (userData) {
          state.user = {
            _id: userData._id,
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            photoUrl: userData.avatar ?? null,
            avatar: userData.avatar ?? null,
          };
          state.avatar = userData.avatar || null;
        }
        toast.success('Current successful');
      })
      .addCase(userCurrentEdit.rejected, (state) => {       
        state.error = true;
        toast.error('User information could not be updated');
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
      })
  },
});

export const { setToken, setRehydrated } = authSlice.actions;
export const authReducer = authSlice.reducer;
