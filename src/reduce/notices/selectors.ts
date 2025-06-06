import { NoticesState } from "./slice";
  
  interface RootState {
    notices: NoticesState;
  }

export const selectItemsNotices = (state: RootState) => state.notices.items;

export const selectFavoritePets = (state: RootState) => state.notices.favoritePets;

export const selectViewedItems = (state: RootState) => state.notices.viewedItems;
console.log(selectViewedItems);

export const selectIsLoggedINotices = (state: RootState) => state.notices.loading;

export const selectErrorNotices = (state: RootState) => state.notices.error;