/* eslint-disable no-unused-vars */
import {
  useCreateProductMutation,
  useUploadImageMutation,
} from "../../redux/api/productApiSlice.js";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu.jsx";
const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  const { data: categories, refetch } = useFetchCategoriesQuery();
  const [uploadImage] = useUploadImageMutation();
  const [createProduct] = useCreateProductMutation();

  const uploadFileHandler = async (e) => {
    const formData = new FormData(); // had formData dyra fhal form , bax t9dr tsyft data l backend
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      toast.success(res.message);
      setImageUrl(res.image);
      setImage(res.image);
    } catch (error) {
      toast.error(error);
      console.log(error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);
      const { data } = await createProduct(productData);
      if (data.error) {
        toast.error("created failed ,please try again");
      } else {
        toast.success(`${data.name} is craeted`);
        navigate("/");
      }
    } catch (error) {
      toast.error(error);
      console.log(error.message);
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex  flex-col md:flex-row ">
        <AdminMenu />
        <div className="md:w-3/4 p-3 ">
          <div className="h-12 font-serif"> Create Product</div>

          {imageUrl && (
            <div className="text-center">
              <img
                src={imageUrl}
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
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-pink-500 hover:bg-pink-700 mt-5 rounded-lg font-bold text-white"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
