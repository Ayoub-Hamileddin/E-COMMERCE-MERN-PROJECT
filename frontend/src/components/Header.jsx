import ProductCarousel from "../pages/Products/ProductCarousel.jsx";
import SmallProduct from "../pages/Products/SmallProduct.jsx";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice.js";
import Loader from "./Loader.jsx";

const Header = () => {
  const { data, isLoading, isError } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h1>Error</h1>;
  }
  return (
    <>
      <div className="flex justify-around w-[1500px] mx-auto ">
        <div className="xl:block lg:hidden md:hidden:sm:hidden">
          <div className="grid grid-cols-2">
            {data.map((product) => (
              <div key={product._id}>
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>
        <ProductCarousel />
      </div>
    </>
  );
};

export default Header;
