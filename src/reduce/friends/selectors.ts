interface FriendsState {
    items: string | null;
    isLoggedIn: boolean;
    error: string | null;
  }
  
  interface RootState {
    friends: FriendsState;
  }

export const selectItems = (state: RootState) => state.friends.items;

export const selectIsLoggedInFriends = (state: RootState) => state.friends.isLoggedIn;

 export const selectErrorFriends = (state: RootState) => state.friends.error;