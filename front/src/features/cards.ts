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
    updateCardReducer: (state, action) => {
      const card = action.payload;

      if (card.isFavorite) {
        const currentItems = state.favorites.filter((c) => c.id !== card.id);
        state.favorites = [card, ...currentItems];
        state.noFavorites = state.noFavorites.filter((c) => c.id !== card.id);
      } else {
        const currentItems = state.noFavorites.filter((c) => c.id !== card.id);
        state.noFavorites = [card, ...currentItems];
        state.favorites = state.favorites.filter((c) => c.id !== card.id);
      }
    },
    deleteCardReducer: (state, action) => {
      const { cardId } = action.payload;
      state.favorites = state.favorites.filter((c) => c.id !== cardId);
      state.noFavorites = state.noFavorites.filter((c) => c.id !== cardId);
    },
  },
});

export const { setCards, updateCardReducer, deleteCardReducer } =
  cardsSlice.actions;
export default cardsSlice.reducer;
