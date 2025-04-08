import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchNotices } from "./operations";

interface NoticesResponse {
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

  interface State {
    items: NoticesResponse[];
    error: boolean | null;
    loading: boolean;  
  };

  const INITIAL_STATE: State = {
    items: [],
    error: null,
    loading: false,
  };

    export const noticesSlice = createSlice({
      name: "notices",
      initialState: INITIAL_STATE,

      reducers: {},
      extraReducers: (builder) => {
        builder
          .addCase(fetchNotices.pending, (state) => {
            state.loading = true;  
            state.error = null; 
          })
            .addCase(fetchNotices.fulfilled, (state, action: PayloadAction<NoticesResponse[]>) => {
            state.loading = false;
            state.items = action.payload;
            state.error = null;
          })
            .addCase(fetchNotices.rejected, (state) => {
            state.error = true;
          })
      }
  
    });

    export const noticesReducer = noticesSlice.reducer;