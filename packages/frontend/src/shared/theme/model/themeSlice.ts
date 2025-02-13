import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { storage, STORAGE_KEYS } from "@/shared/lib/storage";
import { getSystemTheme } from "../lib/getSystemTheme";
import { THEMES } from "../config/themeConstants";
import type { Theme } from "./themeTypes";

interface ThemeState {
  currentTheme: Theme;
  isFollowingSystem: boolean;
}

const getInitialState = (): ThemeState => {
  const savedTheme = storage.get<Theme>(STORAGE_KEYS.THEME);
  if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
    return { currentTheme: savedTheme, isFollowingSystem: false };
  }

  return { currentTheme: getSystemTheme(), isFollowingSystem: true };
};

const initialState: ThemeState = getInitialState();

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setCurrentTheme: (state, action: PayloadAction<Theme>) => {
      state.currentTheme = action.payload;
    },
    setIsFollowingSystem: (state, action: PayloadAction<boolean>) => {
      state.isFollowingSystem = action.payload;
    },
  },
});

export const { setCurrentTheme, setIsFollowingSystem } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
