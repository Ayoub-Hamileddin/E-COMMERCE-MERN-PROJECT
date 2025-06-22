/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFilterProductsQuery } from "../redux/api/productApiSlice.js";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice.js";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice.js";
import Loader from "../components/Loader.jsx";
import ProductCard from "./Products/ProductCard.jsx";

const Shop = () => {
  const dispatch = useDispatch();
  const { checked, radio, categories, products } = useSelector(
    (state) => state.shop
  );
  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const filtredProductQuery = useFilterProductsQuery({ checked, radio });
  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [dispatch, categoriesQuery.data, categoriesQuery.isLoading]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filtredProductQuery.isLoading) {
        const filteredProducts = filtredProductQuery.data?.filter((p) => {
          return (
            p.price.toString().includes(priceFilter) ||
            p.price === parseInt(priceFilter, 10)
          );
        });
        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filtredProductQuery.data, dispatch]);
  const handleBrandClick = (brand) => {
    const proudctsByBrand = filtredProductQuery.data?.filter((p) => {
      p.brand === brand;
    });
    dispatch(setProducts(proudctsByBrand));
  };
  const handleCheck = (value, id) => {
    const updateChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updateChecked));
  };
  const uniqueBrands = [
    ...Array.from(
      new Set(
        filtredProductQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];
  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };
  return (
    <div className="container mx-auto">
      <div className="flex md:flex-row">
        <div className=" bg-[#151515] p-3 mt-2 mb-2 ml-[8rem] rounded-lg">
          <h2 className="h4 font-bold text-center py-2 text-white  rounded-full mb-2">
            Filter by Categories
          </h2>
          <div className="p-5 w-[15rem]">
            {categories.map((c) => (
              <div key={c._id} className="mb-2">
                <div className="flex items-center mr-4 ">
                  <input
                    type="checkbox"
                    onChange={(e) => handleCheck(e.target.value, c._id)}
                    className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label className="ml-2 text-sm  text-white dark:text-gray-300 font-bold ">
                    {c.name}
                  </label>
                </div>
              </div>
            ))}
          </div>

          <h2 className="h4 text-center py-2 font-bold bg-white rounded-full mb-2">
            Filter by Brands
          </h2>
          <div className="p-5">
            {uniqueBrands?.map((brand) => (
              <>
                <div className="flex items-center mr-4 mb-5 ">
                  <input
                    type="radio"
                    id={brand}
                    name="brand"
                    onChange={() => handleBrandClick(brand)}
                    className="w-4 h-4 text-pink-400 bg-gray-100 border-gray-300 focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="pink-radio"
                    className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                  >
                    {brand}
                  </label>
                </div>
              </>
            ))}
          </div>
          <h2 className="h4 text-center py-2 bg-white font-bold rounded-full mb-2">
            Filer by Price
          </h2>

          <div className="p-5 w-[15rem]">
            <input
              type="text"
              value={priceFilter}
              placeholder="Enter Price"
              onChange={handlePriceChange}
              className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-pink-300"
            />
          </div>
          <div className="p-5 pt-0">
            <button
              className="w-full text-white my-4 border px-2 py-2 rounded-lg bg-red-500 hover:bg-red-600 font-bold  "
              onClick={() => window.location.reload()}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="p-3">
          <h2 className="h4 text-center mb-2 ">{products.length}</h2>
          <div className="flex flex-wrap">
            {products.length === 0 ? (
              <Loader />
            ) : (
              products?.map((product) => (
                <div className="p-3" key={product._id}>
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
