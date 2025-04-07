import { createAsyncThunk } from '@reduxjs/toolkit';

import { getNews } from '../services/authServices';

interface News {
    _id: string;
    imgUrl: string;
    title: string;
    text: string;
    date: string;
    url: string;
    id: string;
  };

  export const fetchNews = createAsyncThunk<News[], void>(
    'news/fetchNews',
    async(_, thunkAPI) => {
       try {
         const response: News[] = await getNews();
         return response;
       }catch(err) {
        if (err instanceof Error) {
            return thunkAPI.rejectWithValue(err.message);
          }
          return thunkAPI.rejectWithValue('Friends failed');
       }
    }

  );