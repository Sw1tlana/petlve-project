import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestSignup,
         requestSignIn
         
 } from '../services/authServices';
import { setToken } from './slice';

 interface SignUpResponse {
  user: { 
    id: string; 
    name: string; 
    email: string;
    phone: string;
    password: string;
 }; 
  token: string;
  refreshToken: string;
}
  
  interface SignUpFormData {
    name: string;
    email: string;
    password: string;
    phone: string;
  }

  interface SignInResponse {
    user: {  
      email: string;
      password: string;
   }; 
    token: string;
    refreshToken: string;
  }

  interface SignInFormData {
    email: string;
    password: string;
  }
  
  export const signUpUser = createAsyncThunk<
  SignUpResponse,  
  SignUpFormData,  
  { rejectValue: string }  
>(
  'auth/signUpUser',
  async (formData, thunkAPI) => {
    try {
      console.log("Signing up with:", formData);
      const response = await requestSignup(formData);
      console.log("Response from server:", response);
      const { token, refreshToken, user } = response.data;
      const cleanedToken = token.replace(/"/g, '');  
      const cleanedRefreshToken = refreshToken.replace(/"/g, '');

      console.log("Parsed user data:", user);

      return { user, token: cleanedToken, refreshToken: cleanedRefreshToken };

    } catch {
      return thunkAPI.rejectWithValue('Registration failed');
    }
  }
);

export const signInUser = createAsyncThunk<
  SignInResponse,
  SignInFormData,
{ rejectValue: string }>(
  'auth/signInUser',
  async (formData,thunkAPI) => {
    try {
      const response = await requestSignIn(formData);
      const { token, refreshToken, user } = response.data;

      thunkAPI.dispatch(setToken({ token, refreshToken }));
    return {user, token, refreshToken };
      } catch {
      return thunkAPI.rejectWithValue('Login failed');
    }
  }
)
