import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchFriends } from './operations';

interface WorkDay {
    _id: string;
    isOpen: boolean;
    from?: string;
    to?: string;
  };

  interface PlaceResponse {
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

  interface State {
    items: PlaceResponse[]
    error: boolean | null;
    loading: boolean;  
  }
  
  const INITIAL_STATE: State = {
    items: [],
    error: null,
    loading: false,
  };

  export const friendsSlice = createSlice({
    name: "friends",
    initialState: INITIAL_STATE,

    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchFriends.pending, (state) => {
            state.loading = true;  
            state.error = null; 
          })
          .addCase(fetchFriends.fulfilled, (state, action: PayloadAction<PlaceResponse>) => {
            state.loading = false;
            state.items = [action.payload];
            state.error = null;
          })
          .addCase(fetchFriends.rejected, (state) => {
            state.error = true;
          })
        }
  });

  export const friendsReducer = friendsSlice.reducer;