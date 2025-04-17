import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchNotices } from "./operations";

export interface NoticesResponse {
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

  export interface FavoriteResponse {
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
    favoritePet: FavoriteResponse[];
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

      reducers: {
        addFavorite(state, action: PayloadAction<FavoriteResponse[]>) {
          state.favoritePet.push(...action.payload)
        },
        deleteFavorite: (state, action: PayloadAction<string>) => {
  console.log('Deleting favorite pet with id:', action.payload);
  state.favoritePet = state.favoritePet.filter((pet) => {
    // Переконатись, що порівнюється саме рядок
    const petId = typeof pet._id === 'string' ? pet._id : String(pet._id);
    return petId !== action.payload;
  });
        }
      },
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

    export  const {
      addFavorite,
      deleteFavorite
    } = noticesSlice.actions;

    export const noticesReducer = noticesSlice.reducer;