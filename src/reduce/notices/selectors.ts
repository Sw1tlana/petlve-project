import { Pet } from "./slice";

interface NoticesState {
    items: Pet[];
    favoritePets: Pet[];
    error: boolean | null;
    loading: boolean;  
  }
  
  interface RootState {
    notices: NoticesState;
  }

export const selectItemsNotices = (state: RootState) => state.notices.items;

export const selectFavoritePets = (state: RootState) => state.notices.favoritePets;

export const selectIsLoggedINotices = (state: RootState) => state.notices.loading;

export const selectErrorNotices = (state: RootState) => state.notices.error;