/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader.jsx";
import Message from "../../components/Message.jsx";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon.jsx";
import Ratings from "./Ratings.jsx";
const ProductDetaills = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);
  const { userInfo } = useSelector((state) => state.auth);
  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  return (
    <>
      <div>
        <Link to={"/"} className="ml-[10rem] font-semibold hover:underline ">
          Go Home
        </Link>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant={"danger"}>
            {error?.data?.message || error?.message}
          </Message>
        ) : (
          <>
            <div className="flex flex-wrap relative items-center ml-[10rem] mt-[2rem] ">
              <div>
                <img
                  className="w-full xl:w-[40rem] lg:w-[35rem] md:w-[20rem] sm:w-[10rem] mr-[2rem]"
                  src={product.image}
                  alt={product.name}
                />
                <HeartIcon product={product} />
              </div>
              <div className="flex flex-col justify-between">
                <h2 className="text-2xl font-semibold">{product.name}</h2>
                <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
                  {product.description}
                </p>
                <p className="text-5xl my-4 font-extrabold">
                  {product.price} DH
                </p>
                <div className="flex items-center justify-between w-[20rem]">
                  <div className="one">
                    <h1 className="flex items-center mb-6">
                      <FaStore className="mr-2 text-black" /> Brand:{" "}
                      {product.brand}
                    </h1>
                    <h1 className="flex items-center mb-6 w-[20rem]">
                      <FaClock className="mr-2 text-black" /> Added:{" "}
                      {moment(product.createAt).fromNow()}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaStar className="mr-2 text-black" /> Reviews:{" "}
                      {product.numReviews}
                    </h1>
                  </div>
                  <div className="two">
                    <h1 className="flex items-center mb-6">
                      <FaStar className="mr-2 text-black" /> Ratings: {rating}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaShoppingCart className="mr-2 text-black" /> Quantity:{" "}
                      {product.quantity}
                    </h1>
                    <h1 className="flex items-center mb-6 w-[10rem]">
                      <FaBox className="mr-2 text-black" /> In Stock:{" "}
                      {product.countInStock}
                    </h1>
                  </div>
                </div>
                <div className="flex justify-between flex-wrap">
                  <Ratings value={3.6} text={`${product.numReviews} reviews`} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductDetaills;
