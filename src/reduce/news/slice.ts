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

  interface State {
    items: NewsResponse[];
    loading: boolean;
    error: boolean | null;
  };

  const INITIAL_STATE: State = {
    items: [],
    error: null,
    loading: false,
  };

    export const newsSlice = createSlice({
      name: "friends",
      initialState: INITIAL_STATE,
  
      reducers: {},
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

      export const newsReducer = newsSlice.reducer;