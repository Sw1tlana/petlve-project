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
    viewedItems: Pet[];
    favoritePets: Pet[];
    user?: string;
    error: boolean | null;
    loading: boolean;
    favoriteLoading: boolean;
    page: number;
    limit: number;
    totalPages: number; 
  };

  const INITIAL_STATE: NoticesState = {
    items: [],
    error: null,
    loading: false,
    favoriteLoading: false, 
    viewedItems: [],
    favoritePets: [],
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
            .addCase(fetchNotices.fulfilled, (state, action: PayloadAction<(Pet & { id?: string })[]>) => {
              const itemsWithValidId = action.payload.filter(
                (item) =>
                  (typeof item._id === 'string' && item._id.trim() !== '') ||
                  (typeof item.id === 'string' && item.id.trim() !== '')
              );

              const itemsWithId = itemsWithValidId.map(item => ({
                ...item,
                _id: item._id || item.id!,
              })).filter(item => item._id);

              state.loading = false;
              state.items = itemsWithId;
              state.error = null;
          })
          
          // addFavorite
              .addCase(fetchAddFavorites.pending, (state) => {
                state.favoriteLoading = true;
                state.error = null;
              })
              .addCase(fetchAddFavorites.fulfilled, (state, action) => {
               const petData = action.payload;
          
              if (petData) {
                const exists = state.favoritePets.some(pet => pet?._id === petData._id);
                if (!exists) {
                  state.favoritePets.push(petData);
                }
              }

              state.favoriteLoading = false;
              toast.success('Pet added to favorites⭐');
              })
              .addCase(fetchAddFavorites.rejected, (state) => {
                state.favoriteLoading = false;
                state.error = true;
                toast.error('Could not add a favorite pet❌');
              })

            // deleteFavorite
              .addCase(fetchRemoveFavorites.pending, (state) => {
                state.favoriteLoading = true;
                state.error = null;
              })
              .addCase(fetchRemoveFavorites.fulfilled, (state, action) => {
                const removedPetId = action.payload._id;
                if (state.user) {
                  state.favoritePets = state.favoritePets.filter(pet => pet._id !== removedPetId);
                }
                state.favoriteLoading = false;
                toast.success('Pet removed from favorites🗑️');
              })
              .addCase(fetchRemoveFavorites.rejected, (state) => {
                state.favoriteLoading = false;
                state.error = true;
                toast.error('Unable to delete a favorite pet ❌');
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