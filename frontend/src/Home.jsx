import { useParams, Link } from "react-router-dom";
import Loader from "./components/Loader.jsx";
import { useGetProductsQuery } from "./redux/api/productApiSlice.js";
import Message from "./components/Message.jsx";
import Header from "./components/Header.jsx";
import SmallProduct from "./pages/Products/SmallProduct.jsx";

const Home = () => {
  const { data, isLoading, isError } = useGetProductsQuery();
  const { keyword } = useParams();

  return <>{!keyword ? <Header /> : null}</>;
};

export default Home;
