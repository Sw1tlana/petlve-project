import { createAsyncThunk } from '@reduxjs/toolkit';

import { getNotices } from '../services/authServices';

interface Notices {
    _id: string;
    species: string;
    category: string;
    price: number;
    title: string;
    name: string;
    birthday: string;
    comment: string;
    sex: string;
    location: string;
    imgURL: string;
    createdAt: string;
    updatedAt: string;
    user: string;
    popularity: number;
  };

export const fetchNotices = createAsyncThunk<Notices[], void>(
    'notices/fetchNotices',
    async(_, thunkAPI) => {
        try {
         const response: Notices[] = await getNotices();
         return response;

        }catch (err) {
            if (err instanceof Error) {
                return thunkAPI.rejectWithValue(err.message);
              }
              return thunkAPI.rejectWithValue('Notices failed');
            }
        }
    );

