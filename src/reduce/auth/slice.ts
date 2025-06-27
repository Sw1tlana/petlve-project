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
          fetchUser,
      } from './operations';
import { Pet } from '../notices/slice';

export interface User {
  _id?: string;
  name: string | null;
  email: string | null;
  phone?: string | null;
  avatar?: string | null; 
  photoUrl?: string | null;
  pets: Pets[];
  favoritePets: Pet[];
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
            const apiUser = action.payload.user;

            const user: User = {
              _id: apiUser.id,
              name: apiUser.name,
              email: apiUser.email,
              phone: null,        
              avatar: null,          
              photoUrl: null,      
              pets: [],               
              favoritePets: [],       
            };

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

            state.pets = user.pets ? [...user.pets] : [];

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

     state.pets = user.pets ? [...user.pets] : [];
  }
        toast.success('RefreshToken successful');
      })
      .addCase(refreshTokenUser.rejected, (state) => {
        state.token = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
      })
      
       // --- userCurrent ---
        .addCase(fetchUser.pending, (state) => {
          state.error = false;
          state.isRefreshing = true;
        })
        .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User | undefined>) => {
          const userData = action.payload;

         console.log(action.payload);

           if (!userData) {
    state.error = true;
    toast.error('User data is missing');
    return;
  }

          state.user = {
            _id: userData._id ?? '',
            name: userData.name ?? null,
            email: userData.email ?? null,
            phone: userData.phone ?? null,
            avatar: normalizeAvatar(userData.avatar),
            photoUrl: userData.photoUrl ?? null,
            pets: userData.pets ?? [],
            favoritePets: userData.favoritePets ?? [],
          };

          state.isRefreshing = false;
          state.isLoggedIn = true;
          toast.success('User information updated successfully');
        })
        .addCase(fetchUser.rejected, (state) => {
          state.error = true;
          state.isRefreshing = false;
          toast.error('User information could not be updated');
        })
      .addCase(userCurrentEdit.pending, (state) => {
        state.error = false;
        state.isRefreshing = false;
      })
      .addCase(userCurrentEdit.fulfilled, (state, action: PayloadAction<EditUserResponse>) => {
        console.log('Updated user from API:', action.payload.data.user);
         const userData = action.payload.data?.user;
         console.log('Updated user from API:', action.payload.data.user);

        if (userData) {
          state.user = {
            _id: userData._id,
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            photoUrl: userData.photoUrl,
            avatar: userData.avatar,
            pets: state.user.pets ?? [],            
            favoritePets: state.user.favoritePets ?? [],
          };
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
      .addCase(fetchAddPet.fulfilled, (state, action: PayloadAction<AddPetResponse>) => {
      const petData = action.payload?.data?.data;

      if (petData) {
        state.pets.push({
          ...petData,
          photoUrl: petData.photo,
        });

          if (state.user.pets) {
            state.user.pets.push(petData);
          } else {
            state.user.pets = [petData];
          }
        }
      toast.success('Pet added successfully!');
    })
      .addCase(fetchAddPet.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      // --- deletePet ---
      .addCase(removePet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removePet.fulfilled, (state, action: PayloadAction<string>) => {
          const removedId = action.payload;

          state.pets = state.pets.filter(pet => pet._id !== removedId);

          if (state.user.pets) {
            state.user.pets = state.user.pets.filter(pet => pet._id !== removedId);
          }

          toast.success('Pet removed successfully!');
      })
      .addCase(removePet.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
  },
});

export const { setToken } = authSlice.actions;
export const authReducer = authSlice.reducer;
