import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchNews } from "./operations";

interface NewsResponse {
    _id: string;
    imgUrl: string;
    title: string;
    text: string;
    date: string;
    url: string;
    id: string;
  };

  export interface NewsState {
    items: NewsResponse[];
    loading: boolean;
    error: boolean | null;
    page: number;
    limit: number;
    totalPages: number; 
  };

  const INITIAL_STATE: NewsState = {
    items: [],
    error: null,
    loading: false,
    page: 1,
    limit: 6,
    totalPages: 0,
  };

    export const newsSlice = createSlice({
      name: "friends",
      initialState: INITIAL_STATE,
  
      reducers: {
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
                .addCase(fetchNews.pending, (state) => {
                    state.loading = true;  
                    state.error = null; 
                })
                .addCase(fetchNews.fulfilled, (state, action: PayloadAction<NewsResponse[]>) => {
                    state.loading = false;
                    state.items = action.payload;
                    state.error = null;
                })
                    .addCase(fetchNews.rejected, (state) => {
                      state.error = true;
                })

      }});

          export const {
                      setPage,
                      setLimit,
                      setTotalPages,
          } = newsSlice.actions;

      export const newsReducer = newsSlice.reducer;