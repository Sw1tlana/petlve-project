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
          fetchAddPet,
          AddPetResponse,
          removePet,
          SignInUserResponse,
          getCurrentUser
      } from './operations';

export type AuthState = State;

export interface User {
  _id?: string;
  name: string | null;
  email: string | null;
  phone?: string | null;
  avatar?: string | null; 
  photoUrl?: string | null;
  pets: Pets[];
  favoritePets: Pets[];
}

export interface Pets {
  _id: string;
  name: string;
  species?: string;
  title?: string;
  birthday?: string;
  sex?: string;
  photoUrl?: string;
  photo?: string;
}

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
}

const INITIAL_STATE: State = {
  user: {
    _id: '',
    name: null,
    email: null,
    phone: null,
    avatar: null,
    photoUrl: null,
    pets: [],
    favoritePets: [],
  },
  token: null,
  refreshToken: null,
  avatar: null,
  isLoggedIn: false,
  error: null,  
  isRefreshing: false,
  loading: false,
  pets: [],
}

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
        const userFromApi = action.payload.user;
        state.user = {
          _id: userFromApi.id ?? '',
          name: userFromApi.name ?? null,
          email: userFromApi.email ?? null,
          phone: userFromApi.phone ?? null,
          avatar: null, 
          photoUrl: userFromApi.photoUrl ?? null,
          pets: [],
          favoritePets: [],
        };
        state.avatar = null;
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
      .addCase(signInUser.fulfilled, (state, action: PayloadAction<SignInUserResponse>) => {
        const apiUser = action.payload.user;
        const user: User = {
          _id: apiUser.id ?? '',
          name: apiUser.name ?? null,
          email: apiUser.email ?? null,
          phone: apiUser.phone ?? null,
          avatar: normalizeAvatar(apiUser.avatar ?? null),
          photoUrl: apiUser.photoUrl ?? null,
          pets: apiUser.pets ?? [], 
          favoritePets: apiUser.favoritePets ?? [],
        };
        state.user = user;
        state.avatar = normalizeAvatar(user.avatar);
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
        state.pets = user.pets;
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
          state.user = {
            _id: user._id ?? '',
            name: user.name ?? null,
            email: user.email ?? null,
            phone: user.phone ?? null,
            avatar: normalizeAvatar(user.avatar ?? null),
            photoUrl: user.photoUrl ?? null,
            pets: user.pets ?? [],
            favoritePets: user.favoritePets ?? [],
          };
          state.avatar = normalizeAvatar(state.user.avatar);
          state.pets = state.user.pets;
        }
        toast.success('Refresh token successful');
      })
      .addCase(refreshTokenUser.rejected, (state) => {
        state.token = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
      })

      // --- userCurrentEdit ---

        .addCase(getCurrentUser.pending, (state) => {
          state.isRefreshing = true;
          state.error = null;
        })
        .addCase(getCurrentUser.fulfilled, (state, action) => {
          const user = action.payload.data.user;
          state.user = {
            _id: user._id ?? '',
            name: user.name ?? null,
            email: user.email ?? null,
            phone: user.phone ?? null,
            avatar: normalizeAvatar(user.avatar ?? null),
            photoUrl: user.photoUrl ?? null,
            pets: user.pets ?? [],
            favoritePets: user.favoritePets ?? [],
          };
          state.avatar = normalizeAvatar(state.user.avatar);
          state.pets = state.user.pets;
          state.isLoggedIn = true;
          state.isRefreshing = false;
        })
        .addCase(getCurrentUser.rejected, (state) => {
          state.isRefreshing = false;
          state.isLoggedIn = false;
          state.error = true;
        })

      .addCase(userCurrentEdit.pending, (state) => {
        state.error = false;
        state.isRefreshing = true;
      })
      .addCase(userCurrentEdit.fulfilled, (state, action: PayloadAction<EditUserResponse>) => {
        const userData = action.payload.data?.user;
        if (userData) {
          state.user = {
            _id: userData._id ?? '',
            name: userData.name ?? null,
            email: userData.email ?? null,
            phone: userData.phone ?? null,
            avatar: normalizeAvatar(userData.avatar ?? null),
            photoUrl: userData.photoUrl ?? null,
            pets: userData.pets ?? state.user.pets ?? [],
            favoritePets: userData.favoritePets ?? state.user.favoritePets ?? [],
          };
          state.avatar = normalizeAvatar(state.user.avatar);
          state.pets = state.user.pets;
        }
        state.isRefreshing = false;
        toast.success('User updated successfully');
      })
      .addCase(userCurrentEdit.rejected, (state) => {
        state.error = true;
        state.isRefreshing = false;
        toast.error('User information could not be updated');
      })

      // --- logoutUser ---
      .addCase(logoutUser.pending, (state) => {
        state.error = false;
        state.isRefreshing = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        Object.assign(state, INITIAL_STATE);
        toast.success('Logout successful');
      })
      .addCase(logoutUser.rejected, (state) => {
        state.error = true;
        toast.error('Logout failed');
      })

      // --- fetchAddPet ---
      .addCase(fetchAddPet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddPet.fulfilled, (state, action: PayloadAction<AddPetResponse>) => {
        const petData = action.payload?.data?.data;
        if (petData) {
          const pet: Pets = {
            ...petData,
            photoUrl: petData.photo ?? petData.photoUrl,
          };
          state.pets.push(pet);
          state.user.pets.push(pet);
        }
        state.loading = false;
        toast.success('Pet added successfully!');
      })
      .addCase(fetchAddPet.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      // --- removePet ---
      .addCase(removePet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removePet.fulfilled, (state, action: PayloadAction<string>) => {
        const removedId = action.payload;
        state.pets = state.pets.filter(pet => pet._id !== removedId);
        state.user.pets = state.user.pets.filter(pet => pet._id !== removedId);
        state.loading = false;
        toast.success('Pet removed successfully!');
      })
      .addCase(removePet.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});


export const { setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;

