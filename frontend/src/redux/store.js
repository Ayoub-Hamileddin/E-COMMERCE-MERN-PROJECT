import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./features/auth/authSlice";
import favoriteReducer from "./features/favorites/FavoriteSlice.js";
import { getFavoriteProduct } from "../Utils/LocalStorage.js";


const initialFavorite = getFavoriteProduct();
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favorites: favoriteReducer,
  },
  preloadedState:{
    favorites:initialFavorite,
  }
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
setupListeners(store.dispatch);
export default store;
