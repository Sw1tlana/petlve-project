import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {addFavorite, fetchNotices } from "./operations";

export interface Pet {
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
}

  interface State {
    items: Pet[];
    favoritePet: Pet[];
    error: boolean | null;
    loading: boolean;  
  };

  const INITIAL_STATE: State = {
    items: [],
    error: null,
    loading: false,
    favoritePet: [],
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
            .addCase(fetchNotices.fulfilled, (state, action: PayloadAction<Pet[]>) => {
            state.loading = false;
            state.items = action.payload;
            state.error = null;
          })
            .addCase(fetchNotices.rejected, (state) => {
            state.error = true;
          })
          .addCase(addFavorite.pending, (state) => {
            state.loading = true;  
            state.error = null; 
          })
            .addCase(addFavorite.fulfilled, (state, action: PayloadAction<Pet[]>) => {
            state.loading = false;
            state.favoritePet.push(...action.payload);
            state.error = null;
          })
            .addCase(addFavorite.rejected, (state) => {
            state.error = true;
          })
      }
  
    });

    export const noticesReducer = noticesSlice.reducer;