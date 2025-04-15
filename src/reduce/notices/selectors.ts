import { FavoriteResponse } from "./slice";

interface NoticesState {
    items: string | null;
    favoritePet: FavoriteResponse[];
    isLoggedIn: boolean;
    error: string | null;
  };


  interface RootState {
    notices: NoticesState;
  }

export const selectItemsNotices = (state: RootState) => state.notices.items;

export const selectFavoritePet = (state: RootState) => state.notices.favoritePet;

export const selectIsLoggedINotices = (state: RootState) => state.notices.isLoggedIn;

 export const selectErrorNotices = (state: RootState) => state.notices.error;