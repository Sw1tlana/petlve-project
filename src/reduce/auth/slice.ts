import { toast } from 'react-hot-toast';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signUpUser, 
          signInUser, 
          refreshTokenUser, 
          logoutUser, 
          SignUpResponse,
          RefreshTokenResponse,
          userCurrentEdit,
          EditUserResponse,
          fetchAddPet
      } from './operations';

export interface User {
  _id?: string;
  name: string | null;
  email: string | null;
  phone?: string | null;
  avatar?: string | null; 
  photoUrl?: string | null;
};

export interface Pets {
  _id: string;
  name: string;
  species?: string;
  title?: string;
  birthday?: string;
  sex?: string;
  photoUrl?: string;
  photo?: string;
};

export interface State {
  user: User;
  token: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  error: boolean | null;
  avatar: string | null;
  isRefreshing: boolean;
  loading: boolean;
  pets: Pets[];
};

const INITIAL_STATE: State = {
  user: {
    _id: '',
    name: null,
    email: null,
    phone: null,
    avatar: null,
    photoUrl: null,
  },
  token: null,
  refreshToken: null,
  avatar: null,
  isLoggedIn: false,
  error: null,  
  isRefreshing: false,
  loading: false,
  pets: [],
};

const normalizeAvatar = (avatar: string | null | undefined): string | null => {
  if (!avatar || avatar === "null") return null;
  return avatar;
};

export const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,  
  reducers: {
    setToken(state, action: PayloadAction<{ token: string | null; refreshToken: string | null }>) {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers: (builder) => {
    builder
    // --- signUpUser ---
    .addCase(signUpUser.pending, (state) => {
        state.loading = true;  
        state.error = null; 
      })
      .addCase(signUpUser.fulfilled, (state, action: PayloadAction<SignUpResponse>) => {
        const user = action.payload.user as User;
        state.user = user;
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
      // --- signInUser ---
      .addCase(signInUser.pending, (state) => {
        state.loading = true;  
        state.error = null; 
      })
      .addCase(signInUser.fulfilled, (state, action) => {
          const user = action.payload.user as User;
          const avatar = normalizeAvatar(user.avatar);

          state.user = {
            ...user,
            avatar: avatar,
          };
          state.avatar = avatar;
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
        toast.error('Login failed');
      })
      // --- refreshTokenUser ---
      .addCase(refreshTokenUser.pending, (state) => {
        state.isRefreshing = true;
        state.error = false; 
      })
      .addCase(refreshTokenUser.fulfilled, (state, action: PayloadAction<RefreshTokenResponse>) => {
        const { token, refreshToken, user } = action.payload;
        state.token = token;
        state.refreshToken = refreshToken;
        state.isRefreshing = false;

          if (user) {
    const avatar = normalizeAvatar(user.avatar);
    state.user = {
      ...user,
      avatar,
    };
    state.avatar = avatar;
  }
        toast.success('RefreshToken successful');
      })
      .addCase(refreshTokenUser.rejected, (state) => {
        state.token = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
      })
       // --- userCurrentEdit ---
      .addCase(userCurrentEdit.pending, (state) => {
        state.error = false;
        state.isRefreshing = false;
      })
      .addCase(userCurrentEdit.fulfilled, (state, action: PayloadAction<EditUserResponse>) => {
         const userData = action.payload.data?.user;

        const avatar = normalizeAvatar(userData.avatar);

        if (userData) {
          state.user = {
            _id: userData._id,
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            photoUrl: avatar,
            avatar: avatar,
          };
          state.avatar = avatar;
        }
        toast.success('Current successful');
      })
      .addCase(userCurrentEdit.rejected, (state) => {       
        state.error = true;
        toast.error('User information could not be updated');
      })
        // --- logoutUser ---
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
            // --- fetchAddPet ---
      .addCase(fetchAddPet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddPet.fulfilled, (state, action) => {

  console.log('Payload:', action.payload);
  console.log('Full action:', action);

        state.loading = false;
        const newPet = action.payload.data.data;
        state.pets.push(newPet);
        toast.success('Pet added');
      })
      .addCase(fetchAddPet.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        toast.error(`Could not add an animal: ${action.payload}`);
      })
  },
});

export const { setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
