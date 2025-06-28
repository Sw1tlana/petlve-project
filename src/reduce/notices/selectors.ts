import { NoticesState } from "./slice";
import { State as AuthState } from "../auth/slice";
  
  interface RootState {
    notices: NoticesState;
     auth: AuthState;
  }


export const selectItemsNotices = (state: RootState) => state.notices.items;

export const selectViewedItems = (state: RootState) => state.notices.viewedItems;

export const selectFavorites = (state: RootState) => {
  return state.notices?.favoritePets && state.notices.favoritePets.length > 0
    ? state.notices.favoritePets
    : state.auth.user?.favoritePets || [];
};

export const selectIsLoggedINotices = (state: RootState) => state.notices.loading;

export const selectErrorNotices = (state: RootState) => state.notices.error;

export const selectTotalPages = (state: RootState) => state.notices.totalPages;

export const selectPage = (state: RootState) => state.notices.page || 1;

export const selectLimit = (state: RootState) => state.notices.limit || 6;