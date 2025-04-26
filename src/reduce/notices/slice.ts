import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchNotices } from "./operations";

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

export interface NoticesState {
    items: Pet[];
    favoritePets: Pet[];
    error: boolean | null;
    loading: boolean;  
  };

  const INITIAL_STATE: NoticesState = {
    items: [],
    error: null,
    loading: false,
    favoritePets: [],
  };

    export const noticesSlice = createSlice({
      name: "notices",
      initialState: INITIAL_STATE,

      reducers: {
        addFavorite(state, action: PayloadAction<Pet>) {
          const newPet = action.payload;
          if (!state.favoritePets.some((pet) => pet._id === newPet._id)) {
            state.favoritePets.push(newPet); 
          }
        },
        removeFavorite(state, action: PayloadAction<string>) {  
          const petId = action.payload;  
          state.favoritePets = state.favoritePets.filter((pet) => pet._id !== petId);
        }
      },
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
      }
  
    });

    export const {addFavorite, removeFavorite} = noticesSlice.actions;

    export const noticesReducer = noticesSlice.reducer;