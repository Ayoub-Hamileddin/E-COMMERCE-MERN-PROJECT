import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";

const ProductTabs = ({
  userInfo,
  loadingProductReview,
  rating,
  setRating,
  comment,
  setComment,
  product,
  SubmitHandler,
}) => {
  const [activeTab, setActiveTab] = useState(1);
  const handleActiveTab = (numOfActivePage) => {
    setActiveTab(numOfActivePage);
  };
  return (
    <div className="flex flex-col md-flex-row">
      <section className="mt-[5rem]">
        <div
          className={`flex-1 p-4 cursor-pointer text-lg  ${
            activeTab === 1 ? "font-bold" : ""
          } `}
          onClick={() => handleActiveTab(1)}
        >
          Write your Review
        </div>
        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 2 ? "font-bold" : ""
          } `}
          onClick={() => handleActiveTab(2)}
        >
          All Reviews
        </div>
        <div
          className={`flex-1 p-4 cursor-pointer text-lg ${
            activeTab === 3 ? "font-bold" : ""
          } `}
          onClick={() => handleActiveTab(3)}
        >
          relative Product
        </div>
      </section>
    </div>
  );
};

export default ProductTabs;
