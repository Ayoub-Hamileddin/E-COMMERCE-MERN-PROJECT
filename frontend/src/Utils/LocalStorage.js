// add products to localStorage

export const addFavoriteProduct = (product) => {
  const favorites = getFavoriteProduct();
  if (!favorites.some((p) => p._id === product._id)) {
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};
// remove products to localStorage
export const removeFavoriteProduct = (product) => {
  const favorites = getFavoriteProduct();
  const updateFavorites = favorites.filter((p) => p._id !== product._id);
  localStorage.setItem("favorites", JSON.stringify(updateFavorites));
};
// retrieve products to localStorage
export const getFavoriteProduct = () => {
  const FavoritesJson = localStorage.getItem("favorites");
  return FavoritesJson ? JSON.parse(FavoritesJson) : [];
};
