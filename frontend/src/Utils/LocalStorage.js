// add products to localStorage

export const addFavoriteToLocalStorage = (product) => {
  const favorites = getFavoritesFromLocalStorage();
  if (!favorites.some((p) => p._id === product._id)) {
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};
// remove products to localStorage
export const removeFavoriteFromLocalStorage = (productId) => {
  const favorites = getFavoritesFromLocalStorage();
  const updateFavorites = favorites.filter((p) => p._id !== productId);
  localStorage.setItem("favorites", JSON.stringify(updateFavorites));
};
// retrieve products to localStorage
export const getFavoritesFromLocalStorage = () => {
  const FavoritesJson = localStorage.getItem("favorites");
  return FavoritesJson ? JSON.parse(FavoritesJson) : [];
};
