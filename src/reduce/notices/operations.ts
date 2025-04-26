import { createAsyncThunk } from '@reduxjs/toolkit';

import { getNotices } from '../services/authServices';
import { Pet } from './slice';

export const fetchNotices = createAsyncThunk<Pet[], void>(
    'notices/fetchNotices',
    async(_, thunkAPI) => {
        try {
         const response: Pet[] = await getNotices();
         return response;

        }catch (err) {
            if (err instanceof Error) {
                return thunkAPI.rejectWithValue(err.message);
              }
              return thunkAPI.rejectWithValue('Notices failed');
            }
        }
    );
