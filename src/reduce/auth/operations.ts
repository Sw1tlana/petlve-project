import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestSignUp,
         requestSignIn,
         getRefreshToken,
         setAuthHeader,
         requestLogout,
         SignupFormData,
         SignInFormData,
         updateCurrentEdit,
         CurrentFormData,
         AddPetFormData,
         requestAddPet,
         deletePet,
         requestCurrentEdit,
         
 } from '../services/authServices';
import { Pets, setToken, User } from './slice';
import { RootState } from '../store';

export interface SignUpResponse {
  user: { 
    id: string; 
    name: string; 
    email: string;
    phone: string;
    password: string;
    photoUrl: string;
 }; 
  token: string;
  refreshToken: string;
};
  
export interface SignInUserResponse {
  user: {
    id: string;
    name: string | null;
    email: string | null;
    phone?: string | null;
    avatar?: string | null;
    photoUrl?: string | null;
    pets?: Pets[];
    favoritePets?: Pets[];
  };
  token: string | null;
  refreshToken: string | null;
}

export interface FetchUserResponse {
  success: boolean;
  data: {
    user: User;  
  };
}

  export interface EditUserResponse {
  success: boolean;
  data: {
    message: string;
    user: User;
  };
  };

export type AddPetResponse = {
  data: {
    data: Pets;
    message: string;
    success: boolean;
  };
};

export interface RefreshTokenResponse {
    token: string;
    refreshToken: string;
    user?: User;
  };


  export const signUpUser = createAsyncThunk<
  SignUpResponse,  
  SignupFormData,  
  { rejectValue: string }  
>(
  'auth/signUpUser',
  async (formData, thunkAPI) => {
    try {
      const response = await requestSignUp(formData);
      const { token, refreshToken, user } = response.data;
      const cleanedToken = token.replace(/"/g, '');  
      const cleanedRefreshToken = refreshToken.replace(/"/g, '');

      return { user, token: cleanedToken, refreshToken: cleanedRefreshToken };

    } catch(err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);  
      }
      return thunkAPI.rejectWithValue('Registration failed');
    }
  }
);

export const signInUser = createAsyncThunk<
  SignInUserResponse,
  SignInFormData,
{ rejectValue: string }>(
  'auth/signInUser',
  async (formData, thunkAPI) => {
    try {
      const response = await requestSignIn(formData);
      const { token, refreshToken, user } = response.data;

      thunkAPI.dispatch(setToken({ token, refreshToken }));
      return {user, token, refreshToken };
      
      } catch(err){
        if (err instanceof Error) {
          return thunkAPI.rejectWithValue(err.message);  
        }
      return thunkAPI.rejectWithValue('Login failed');
    }
  }
);

export const getCurrentUser = createAsyncThunk<FetchUserResponse, void>(
  'auth/getCurrentUser',
  async (_, thunkAPI) => {
    try {
      const response = await requestCurrentEdit();
      return response;
     } catch(err){
        if (err instanceof Error) {
          return thunkAPI.rejectWithValue(err.message);  
        }
      return thunkAPI.rejectWithValue('Current failed');
    }
  }
);

export const userCurrentEdit = createAsyncThunk<
  EditUserResponse,
  CurrentFormData,
  {
    state: RootState;
    rejectValue: string;
  }
>(
  'auth/userCurrentEdit',
  async (formData, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No token provided');
    }

    try {
      const response = await updateCurrentEdit(formData, token);
      return response;
    } catch(err){
      if (err instanceof Error) {
         console.error("Add pet error:", err);
        return thunkAPI.rejectWithValue(err.message);  
      }
    return thunkAPI.rejectWithValue('Login failed');
  }
}
);

export const refreshTokenUser = createAsyncThunk<
  RefreshTokenResponse,
  void,
  {rejectValue: string}
  >('auth/refreshTokenUser',
    async (_, thunkAPI) => {
      const state = thunkAPI.getState() as RootState;
      const refreshToken = state.auth.refreshToken;

      if (!refreshToken) {
        return thunkAPI.rejectWithValue('No refresh token available');
      }

try {
    const { token, refreshToken: newRefreshToken } = await getRefreshToken(refreshToken);

    thunkAPI.dispatch(setToken({ token, refreshToken: newRefreshToken }));

    setAuthHeader(token);
    return { token, refreshToken: newRefreshToken };
} catch(err) {
  if (err instanceof Error) {
    return thunkAPI.rejectWithValue(err.message);  
  }
    return thunkAPI.rejectWithValue('Token refresh failed');
}
 });

 export const fetchAddPet = createAsyncThunk<
 AddPetResponse,
 AddPetFormData,
 {
  state: RootState,
  rejectValue: string
 }
 >('auth/fetchAddPet',
  async(formData, thunkAPI) => {

    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue('No token provided');
    }
    try {
        const response = await requestAddPet(formData, token);
         console.log('response from API:', response);

        return response;
    } catch(err){
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);  
      }
    return thunkAPI.rejectWithValue('Login failed');
  }
  }
);

export const removePet = createAsyncThunk(
  'auth/removePets',
  async (_id: string, thunkAPI) => {
    try {
      await deletePet(_id);
      return _id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err instanceof Error ? err.message : 'Remove Pets Error'
      );
    }
  }
);

 export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async(_, thunkAPI) => {
    try {
    await requestLogout();
    }catch(err) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);  
      }
      return thunkAPI.rejectWithValue('Logout failed');
    }
  }
 );

