import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoritesCount = favorites.length;

  return (
    <div className="absolute top-9 left-2">
      {favoritesCount > 0 && (
        <span className="px-2 bg-pink-500 text-sm rounded-full py-0 ">
          {favoritesCount}
        </span>
      )}
    </div>
  );
};

export default FavoritesCount;
