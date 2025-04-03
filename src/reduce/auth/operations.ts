import { createAsyncThunk } from '@reduxjs/toolkit';

import { requestSignup
         
 } from '../services/authServices';

 interface SignupResponse {
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
  
  interface SignupFormData {
    name: string;
    email: string;
    password: string;
    phone: string;
  }
  
  export const signUpUser = createAsyncThunk<
  SignupResponse,  
  SignupFormData,  
  { rejectValue: string }  
>(
  'auth/signUpUser',
  async (formData, thunkAPI) => {
    try {
      console.log("Signing up with:", formData);
      const response = await requestSignup(formData);
      console.log("Response from server:", response);
      const { token, refreshToken, user } = response;
      const cleanedToken = token.replace(/"/g, '');  
      const cleanedRefreshToken = refreshToken.replace(/"/g, '');

      console.log("Parsed user data:", user);

      return { user, token: cleanedToken, refreshToken: cleanedRefreshToken };

    } catch {
      return thunkAPI.rejectWithValue('Registration failed');
    }
  }
);