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
          <></>
        )}
      </div>
    </>
  );
};

export default ProductDetaills;
