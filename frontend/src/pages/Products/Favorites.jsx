import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/FavoriteSlice.js";
import Product from "./Product.jsx";
const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);
  console.log(favorites);

  return (
    <div className="ml-[10rem]">
      <h1 className="font-bold mt-[3rem] ml-[3rem] text-lg">
        FAVORITES PRODUCTS
      </h1>
      <div className="flex flex-wrap">
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
