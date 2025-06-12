import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorite,
  removeFavorite,
  setFavorite,
} from "../../redux/features/favorites/FavoriteSlice.js";

import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../Utils/LocalStorage.js";

import { useEffect } from "react";
const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites.some((p) => p._id === product._id);
  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorite(favoritesFromLocalStorage));
  }, [dispatch]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteFromLocalStorage(product._id);
      dispatch(removeFavorite(product));
    } else {
      addFavoriteToLocalStorage(product);
      dispatch(addToFavorite(product));
    }
  };

  return (
    <div
      onClick={toggleFavorite}
      className="absolute top-2 right-5 cursor-pointer  "
    >
      {isFavorite ? (
        <FaHeart className="text-pink-500" />
      ) : (
        <FaRegHeart className="text-black" />
      )}
    </div>
  );
};

export default HeartIcon;
