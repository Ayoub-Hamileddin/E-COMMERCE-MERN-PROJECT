/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFilterProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice.js";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice.js";
import Loader from "../components/Loader.jsx";

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
        const filteredProducts = filtredProductQuery.data.filter((p) => {
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
      : checked.data?.filter((c) => c !== id);
    dispatch(setProducts(updateChecked));
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
  return <div>Shop</div>;
};

export default Shop;
