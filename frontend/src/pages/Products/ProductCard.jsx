import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <div className="max-w-sm relative bg-[#1A1A1A] rounded-lg shaodw dark:bg-gray-800 dark:border-gray-700">
      <section className="relative">
        <Link to={`product.${product._id}`}>
          <span className="absolute bottom-3 right-3 bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
            {product.brand}
          </span>
          <img
            className="cursor-pointer w-full"
            src={product.image}
            alt={product.name}
            style={{ height: "170px", objectFit: "cover" }}
          />
          <HeartIcon product={product} />
        </Link>
      </section>
    </div>
  );
};

export default ProductCard;
