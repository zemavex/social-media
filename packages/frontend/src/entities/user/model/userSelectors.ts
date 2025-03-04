export const selectUser = (state: RootState) => state.user.user;
export const selectUserId = (state: RootState) => state.user.user.id;
export const selectAuthState = (state: RootState) => state.user.authState;
