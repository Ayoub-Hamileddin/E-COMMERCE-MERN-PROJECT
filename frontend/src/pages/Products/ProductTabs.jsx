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

  const { data, isLoading } = useGetTopProductsQuery();
  return (
    <div className="flex flex-col md:flex-row ">
      <section className="mr-[5rem]">
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
      {/* the Second Part */}
      <section>
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form onSubmit={SubmitHandler}>
                <div className="my-2">
                  <label
                    htmlFor="ratings"
                    className="block font-serif text-xl mb-2 "
                  >
                    Ratings :
                  </label>
                  <select
                    id="ratings"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 block rounded-lg xl:w-[40rem] text-black"
                  >
                    <option value="">Select</option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Exceptional</option>
                  </select>
                </div>
                <div className="my-2">
                  <label
                    htmlFor="comment"
                    className="block font-serif text-xl mb-2"
                  >
                    comment :
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-4 border-2 w-[100%]"
                    placeholder="Write a Comment"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 font-bold rounded-lg"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p>
                please <Link> Sign In</Link> To Write Review
              </p>
            )}
          </div>
        )}
      </section>
      <section>
        {activeTab === 2 && (
          <>
            <div className="my-[4rem] text-3xl font-bold text-red-400  shadow-red-200 ">
              {product.reviews.length === 0 && <p>No Reviews</p>}
            </div>
            <div>
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white/40 shadow-md  p-4 rounded-lg xl:ml-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem] mb-5"
                >
                  <div className="flex justify-between">
                    <strong className="text-black"> {review.name}</strong>
                    <p className="text-black">
                      {review.createdAt.substring(0, 10)}
                    </p>
                  </div>
                  <p className="my-4">{review.comment}</p>
                  <Ratings value={review.rating} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>
      <section>
        {activeTab === 3 && (
          <section className="flex flex-wrap ml-[4rem]">
            {isLoading ? (
              <Loader />
            ) : (
              data.map((product) => (
                <div key={product._id}>
                  <SmallProduct product={product} />
                </div>
              ))
            )}
          </section>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;
