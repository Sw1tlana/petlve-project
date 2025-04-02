import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestSignup
         
 } from '../services/authServices';

 interface SignupResponse {
  user: { 
    id: string; 
    name: string; 
    email: string }; 
  token: string;
  refreshToken: string;
}
  
  interface SignupFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  
  export const signUpUser = createAsyncThunk<
  SignupResponse,  
  SignupFormData,  
  { rejectValue: string }  
>(
  'auth/signUpUser',
  async (formData, thunkAPI) => {
    try {
      const response = await requestSignup(formData);
      const { token, refreshToken, user } = response;

      return { user, token, refreshToken };
    } catch {
      return thunkAPI.rejectWithValue('Registration failed');
    }
  }
);