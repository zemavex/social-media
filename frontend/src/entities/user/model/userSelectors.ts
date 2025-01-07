export const selectUser = (state: RootStateGlobal) => state.user;
export const selectIsAuthenticated = (state: RootStateGlobal) =>
  state.user.isAuthenticated;
