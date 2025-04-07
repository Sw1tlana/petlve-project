interface NewsResponse {
    _id: string;
    imgUrl: string;
    title: string;
    text: string;
    date: string;
    url: string;
    id: string;
  };

interface NewsState {
    items: NewsResponse[];
    isLoggedIn: boolean;
    error: string | null;
  };

  interface RootState {
    news: NewsState;
  };

  export const selectItemsNews = (state: RootState) => state.news.items;
  
  export const selectIsLoggedInNews = (state: RootState) => state.news.isLoggedIn;
  
  export const selectErrorNews = (state: RootState) => state.news.error;