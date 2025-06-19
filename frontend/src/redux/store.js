import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./features/auth/authSlice";
import favoriteReducer from "./features/favorites/FavoriteSlice.js";
import { getFavoritesFromLocalStorage } from "../Utils/LocalStorage.js";
import cartReducer from "./features/cart/cartSlice.js";
import shopReducer from "./features/shop/shopSlice.js";
const initialFavorite = getFavoritesFromLocalStorage() || [];
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favorites: favoriteReducer,
    cart: cartReducer,
    shop: shopReducer,
  },
  preloadedState: {
    favorites: initialFavorite,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
setupListeners(store.dispatch);
export default store;
