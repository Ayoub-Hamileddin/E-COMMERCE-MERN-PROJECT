import { Link } from "react-router-dom";
const Product = ({ product }) => {
  return (
    <div className="w-[20rem] ml-[4rem] p-4 relative">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-[30rem] rounded "
        />
        {/* <HeartIcon product={product} /> */}
      </div>
      <div>
        <Link to={`/product/${product._id}`}>
          <h2>
            <div className="text-lg"> {product.name}</div>
            <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full  dark:bg-pink-900 dark:text-pink-300">
              {product.price} DH
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default Product;
