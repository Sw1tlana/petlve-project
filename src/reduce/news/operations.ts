import { createAsyncThunk } from '@reduxjs/toolkit';

import { getNews, GetNewsResponse, News } from '../services/authServices';
import { setLimit, setPage, setTotalPages } from '../notices/slice';

  export const fetchNews = createAsyncThunk<News[], {page: string; limit: string; }>(
    'news/fetchNews',
    async({ page, limit }, thunkAPI) => {
       try {
        const queryParams = new URLSearchParams({page, limit}).toString();
         const response: GetNewsResponse = await getNews(`?${queryParams}`);
        
                     const pagination = response.data.pagination;
         
                     thunkAPI.dispatch(setPage(pagination.page));
                     thunkAPI.dispatch(setLimit(pagination.limit));
                     thunkAPI.dispatch(setTotalPages(pagination.pages));
         
               return response.data.data;
       }catch(err) {
        if (err instanceof Error) {
            return thunkAPI.rejectWithValue(err.message);
          }
          return thunkAPI.rejectWithValue('Friends failed');
       }
    }

  );