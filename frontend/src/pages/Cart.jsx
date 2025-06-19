import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice.js";
import { FaTrash } from "react-icons/fa";
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (productID) => {
    dispatch(removeFromCart(productID));
    navigate("/cart");
  };
  const checkOutHandler = () => {
    navigate("/login?redirect=/shipping");
  };
  return (
    <>
      <div className="container flex justify-around items-center flex-wrap mx-auto mt-8">
        {cartItems.length === 0 ? (
          <div className="text-2xl text-gray-500 capitalize shadow-gray-200 shadow-sm p-2">
            Your cart is Empty{" "}
            <Link className="underline " to={"/shop"}>
              {" "}
              Go To shop{" "}
            </Link>
          </div>
        ) : (
          <div className="flex flex-col w-[80%]">
            <h1 className="text-2xl font-semibold mb-4 ">Shopping Cart</h1>
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center mb-[1rem] pb-2">
                <div className="w-[5rem] h-[5rem] ">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded "
                  />
                </div>
                <div className="flex-1 ml-4">
                  <Link to={`/product/${item._id}`} className="text-pink-500">
                    {item.name}
                  </Link>

                  <div className="mt-2 text-black">{item.brand}</div>
                  <div className="mt-2 text-black font-bold">
                    {item.price} DH
                  </div>
                </div>
                <div className="w-24">
                  <select
                    className=" w-[60%] p-1 rounded-lg text-center "
                    value={item.qty}
                    onChange={(e) =>
                      addToCartHandler(item, Number(e.target.value))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-red-500 p-1">
                  <button onClick={() => removeFromCartHandler(item._id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-8 w-[80%]">
          <div className="p-4 rounded-lg">
            <h2 className="font-bold text-2xl  ">
              items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
            </h2>
            <div className="font-bold text-2xl  ">
              Total: (
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
              ) DH
            </div>
            <button
              disabled={cartItems.length === 0}
              className={` bg-pink-500 w-[50%] text-white  font-bold px-4 py-2 rounded-lg mt-4 
                ${cartItems.length === 0 && " cursor-not-allowed "}  `}
              onClick={() => checkOutHandler()}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
