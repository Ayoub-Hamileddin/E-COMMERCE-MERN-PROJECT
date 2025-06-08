/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useUploadImageMutation,
  useDeleteProductMutation,
  useGetProductsByIdQuery,
} from "../../redux/api/productApiSlice.js";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice.js";
import { toast } from "react-toastify";
import { useEffect } from "react";
import AdminMenu from "./AdminMenu.jsx";
const UpdateProduct = () => {
  const params = useParams();
  const { data: productData } = useGetProductsByIdQuery(params._id);
  console.log(productData);

  const [image, setImage] = useState(productData?.image || "");
  const [name, setName] = useState(productData?.name || "");
  const [description, setDescription] = useState(
    productData?.description || ""
  );
  const [price, setPrice] = useState(productData?.price || "");
  const [category, setCategory] = useState(productData?.category || "");
  const [quantity, setQuantity] = useState(productData?.quantity || "");
  const [brand, setBrand] = useState(productData?.brand || "");
  const [stock, setStock] = useState(productData?.countInStock);

  const navigate = useNavigate();
  const { data: categories = [] } = useFetchCategoriesQuery();
  const [uploadImage] = useUploadImageMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  useEffect(() => {
    if (productData && productData._id) {
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setCategory(productData.category?._id);
      setQuantity(productData.quantity);
      setBrand(productData.brand);
      setImage(productData.image);
      setStock(productData.countInStock);
    }
  }, [productData]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      toast.success("file upload successfuly");
      console.log(res.image);
      setImage(res.image);
    } catch (error) {
      console.log(error.message);
      toast.error(error);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const productData = new FormData();
    productData.append("image", image);
    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("category", category);
    productData.append("quantity", quantity);
    productData.append("brand", brand);
    productData.append("countInStock", stock);
    try {
      const { data } = await updateProduct({
        productId: params._id,
        productData,
      });
      if (data.error) {
        toast.error("product updating failed");
      } else {
        toast.success("product Updated successfuly");
        navigate("/admin/allproductslist");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error);
    }
  };
  const handleDelete = async () => {
    try {
      const answer = window.confirm(
        "are you sure you want to delete this product ?"
      );
      if (!answer) return;
      const { data } = await deleteProduct(params._id);
      toast.success("product deleted");
      navigate("/admin/allproductslist");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex  flex-col md:flex-row ">
        <AdminMenu />
        <div className="md:w-3/4 p-3 ">
          <div className="h-12 font-serif"> Create Product</div>

          {image && (
            <div className="text-center">
              <img
                src={image}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="block w-full text-center border px-4 py-11 rounded-lg text-black font-bold cursor-pointer">
              {image ? image.name : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="*/"
                onChange={uploadFileHandler}
                className={!image ? " hidden" : "text-black"}
              />
            </label>
          </div>
          <div className="mb-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">Name</label>
                <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg  text-black"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="two ml-10">
                <label htmlFor="name block">Price</label>
                <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg  text-black"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name block">Quantity</label>
                <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg  text-black"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="two ml-10">
                <label htmlFor="name block">Brand</label>
                <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg  text-black"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>
            <label className="my-5">Description</label>
            <textarea
              type="text"
              className="p-2 mb-3  border rounded-lg w-[95%] text-black resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className="flex justify-between">
              <div>
                <label htmlFor="name block">Count In Stock</label> <br />
                <input
                  type="number"
                  className="p-4 w-[30rem] border rounded-lg"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">Category</label> <br />
                <select
                  className="p-4 w-[30rem] border rounded-lg   "
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-500 hover:bg-green-700 mt-5 rounded-lg font-bold text-white mr-6"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-700 mt-5 rounded-lg font-bold text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
