import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestSignup
         
 } from '../services/authServices';

 interface SignupResponse {
    user: { id: string; username: string };
  }
  
  interface SignupFormData {
    username: string;
    email: string;
    password: string;
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