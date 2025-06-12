import { createSlice } from "@reduxjs/toolkit";

const FavoriteSlice = createSlice({
  name: "Favorites",
  initialState: [],
  reducers: {
    addToFavorite: (state, action) => {
      // * check  if the product is not already favorite
      if (!state.some((product) => product._id === action.payload._id)) {
        state.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      return state.filter((product) => product._id !== action.payload._id);
    },
    setFavorite: (state, action) => {
      return action.payload;
    },
  },
});
export const { addToFavorite, removeFavorite, setFavorite } =
  FavoriteSlice.actions;
export const selectFavoriteProduct = (state) => state.favorites;
export default FavoriteSlice.reducer;
