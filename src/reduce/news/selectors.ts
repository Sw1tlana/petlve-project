import { NewsState } from "./slice";


  interface RootState {
    news: NewsState;
  };

  export const selectItemsNews = (state: RootState) => state.news.items;
  
  export const selectIsLoggedInNews = (state: RootState) => state.news.loading;
  
  export const selectErrorNews = (state: RootState) => state.news.error;

  export const selectTotalPages = (state: RootState) => state.news.totalPages;
  
  export const selectPage = (state: RootState) => state.news.page || 1;
  
  export const selectLimit = (state: RootState) => state.news.limit || 6;