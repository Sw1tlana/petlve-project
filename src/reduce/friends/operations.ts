import { createAsyncThunk } from '@reduxjs/toolkit';

import { getFriends } from '../services/authServices';

interface WorkDay {
    _id: string;
    isOpen: boolean;
    from?: string;
    to?: string;
  };

  interface Place {
    _id: string;
    title: string;
    url: string;
    addressUrl: string;
    imageUrl: string;
    address: string;
    workDays: WorkDay[];
    phone: string;
    email: string;
  }

export const fetchFriends = createAsyncThunk<Place>(
    'friends/fetchFriends',
    async(_, thunkAPI) => {
       try {
         const response = await getFriends();
         return response.data;
         
       }catch (err) {
        if (err instanceof Error) {
            return thunkAPI.rejectWithValue(err.message);  
          }
          return thunkAPI.rejectWithValue('Friends failed');
       }
    }
)