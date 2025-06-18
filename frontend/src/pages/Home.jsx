import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import { useGetProductsQuery } from "../redux/api/productApiSlice.js";
import Message from "../components/Message.jsx";
import Header from "../components/Header.jsx";
import SmallProduct from "./Products/SmallProduct.jsx";
import Product from "./Products/Product.jsx";

const Home = () => {
  const { data, isLoading, isError } = useGetProductsQuery();
  const { keyword } = useParams();

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant={"danger"}>
          {isError?.data?.message || isError?.message}
        </Message>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="ml-[20rem] mt-[10rem] text-[3rem] font-serif">
              Special Products
            </h1>

            <Link
              to={"/shop"}
              className="bg-pink-400 font-bold rounded-full px-10 py-2 mr-[18rem] mt-[10rem] text-white"
            >
              Shop
            </Link>
          </div>
          <div className="flex justify-between flex-wrap items-center">
            {data.products.map((product) => (
              <div key={product._id}>
                <Product product={product} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
