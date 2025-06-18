import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";
import { Car } from "lucide-react";
const Cart = () => {
  const navigate = useNavigate();
  const dipatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;
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
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
