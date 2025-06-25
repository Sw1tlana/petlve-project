import { createAsyncThunk } from '@reduxjs/toolkit';

import { addFavoritesNotices, getNotices, GetNoticesResponse, removeFavoritesNotices, RemoveFavoritesResponse } from '../services/authServices';
import { Pet, setLimit, setPage, setTotalPages } from './slice';

export const fetchNotices = createAsyncThunk<Pet[], { page: string; limit: string }>(
    'notices/fetchNotices',
    async({ page, limit }, thunkAPI) => {

        try {
            const queryParams = new URLSearchParams({ page, limit }).toString();
            const response: GetNoticesResponse = await getNotices(`?${queryParams}`);

            const pagination = response.data.pagination;

            thunkAPI.dispatch(setPage(pagination.page));
            thunkAPI.dispatch(setLimit(pagination.limit));
            thunkAPI.dispatch(setTotalPages(pagination.pages));

      return response.data.data;

        }catch (err) {
            if (err instanceof Error) {
                return thunkAPI.rejectWithValue(err.message);
              }
              return thunkAPI.rejectWithValue('Notices failed');
            }
        }
    );

    //  addFavorites

export const fetchAddFavorites = createAsyncThunk<Pet, string >(
  'notices/fetchAddFavorites',
  async (petId: string , thunkAPI) => {
    try {
      const response = await addFavoritesNotices(petId);

      return response;
    
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err instanceof Error ? err.message : 'Add Favorites Error'
      );
    }
  }
);

export const fetchRemoveFavorites = createAsyncThunk<
  RemoveFavoritesResponse, 
  string,                  
  { rejectValue: string } 
>(
  'notices/fetchRemoveFavorites',
  async (petId, thunkAPI) => {
    try {
      const response = await removeFavoritesNotices(petId);
      return response as RemoveFavoritesResponse;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err instanceof Error ? err.message : 'Add Favorites Error'
      );
    }
  }
);

