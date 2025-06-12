import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchAddFavorites, fetchNotices, fetchRemoveFavorites } from "./operations";
import { toast } from 'react-hot-toast';

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
    viewedItems: Pet[];
    error: boolean | null;
    loading: boolean; 
    page: number;
    limit: number;
    totalPages: number; 
  };

  const INITIAL_STATE: NoticesState = {
    items: [],
    error: null,
    loading: false,
    favoritePets: [],
    viewedItems: [],
    page: 1,
    limit: 6,
    totalPages: 0,
  };

    export const noticesSlice = createSlice({
      name: "notices",
      initialState: INITIAL_STATE,

      reducers: {
        addViewedItems(state, action: PayloadAction<Pet>) {
          const newPet = action.payload;
          if (!state.viewedItems.some((pet) => pet._id === newPet._id)) {
            state.viewedItems.push(newPet);
            toast.success('Pet added to viewed items 👀');
          }
        },
        removeViewedItem(state, action: PayloadAction<string>) {
          state.viewedItems = state.viewedItems.filter(pet => pet._id !== action.payload);
          toast.error('Pet removed from viewed items ❌');
        },
          setPage: (state, action) => {
              state.page = action.payload;
          },
          setLimit: (state, action) => {
              state.limit = action.payload;
          },
          setTotalPages: (state, action) => {
              state.totalPages = action.payload;
          },
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
          .addCase(fetchAddFavorites.pending, (state) => {
            state.loading = true;  
            state.error = null; 
          })
          .addCase(fetchAddFavorites.fulfilled, (state, action) => {
          state.loading = false;
          state.favoritePets = [...state.favoritePets, action.payload];
          toast.success('Pet added to favorites ⭐'); 
          })
            .addCase(fetchAddFavorites.rejected, (state) => {
              state.loading = false;
              state.error = true;
              toast.error('Failed to add pet to favorites ❌');
          })
            .addCase(fetchRemoveFavorites.pending, (state) => {
            state.loading = true;  
            state.error = null; 
          })
          .addCase(fetchRemoveFavorites.fulfilled, (state, action) => {
            const index = state.favoritePets.findIndex(pet => pet._id === action.payload._id);
            if (index !== -1) {
              state.favoritePets.splice(index, 1);
              toast.error('Animal removed from favorites 🗑️');
            }
          })
            .addCase(fetchRemoveFavorites.rejected, (state) => {
              state.loading = false;
              state.error = true;
              toast.error('Failed to removed pet to favorites ❌');
          })
      }
  
    });

    export const {
                addViewedItems,
                removeViewedItem,
                setPage,
                setLimit,
                setTotalPages,
    } = noticesSlice.actions;

    export const noticesReducer = noticesSlice.reducer;