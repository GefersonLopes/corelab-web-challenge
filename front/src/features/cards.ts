import { createSlice } from '@reduxjs/toolkit';
import { ICard } from '../types/Card';

const initialState = {
  favorites: [] as ICard[],
  noFavorites: [] as ICard[],
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards: (state, action) => {
      const { favorites, noFavorites } = action.payload;
      state.favorites = favorites;
      state.noFavorites = noFavorites;
    },
  },
});

export const { setCards } = cardsSlice.actions;
export default cardsSlice.reducer;
