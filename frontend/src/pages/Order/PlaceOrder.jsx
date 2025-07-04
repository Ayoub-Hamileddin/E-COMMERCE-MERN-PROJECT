import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProgressSteps from "../../components/ProgressSteps.jsx";
import Message from "../../components/Message.jsx";
import Loader from "../../components/Loader.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice.js";
import { toast } from "react-toastify";
import { clearCartItems } from "../../redux/features/cart/cartSlice.js";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      console.log("im here");
      dispatch(clearCartItems());
      console.log("dipatch");
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    if (!cart.shippingAddress.adress) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.adress, navigate]);
  return (
    <>
      <ProgressSteps step1 step2 step3 />
      <div className="container ml-[10rem] mt-8 overflow-x-hidden">
        {cart.cartItems.length === 0 ? (
          <Message variant={"danger"}> your Cart is Empty</Message>
        ) : (
          <div className="overflow-x-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <td className="px-1 py-2 text-left align-top">Image</td>
                  <td className="px-1 py-2 text-left">Product</td>
                  <td className="px-1 py-2 text-left">Quantity</td>
                  <td className="px-1 py-2 text-left">Price</td>
                  <td className="px-1 py-2 text-left">Total</td>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="p-2">
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">{item.price}</td>

                    <td>{(item.quantity * item.price).toFixed(2)}DH</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold ">Order Summary</h2>
          <div className="flex justify-between flex-wrap w-[80%] p-4">
            <ul className="text-lg">
              <li>
                <span className="font-semibold mb-4">Items:</span> $
                {cart.itemsPrice}
              </li>
              <li>
                <span className="font-semibold mb-4">Shipping:</span> $
                {cart.shippingPrice}
              </li>
              <li>
                <span className="font-semibold mb-4">Tax:</span> $
                {cart.taxPrice}
              </li>
              <li>
                <span className="font-semibold mb-4">Total:</span> $
                {cart.totalPrice}
              </li>
            </ul>
            {error && <Message variant={"danger"}>{error}</Message>}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Shipping</h2>
              <p>
                <strong>Adress :</strong> {cart.shippingAddress.adress},{""}
                {cart.shippingAddress.country},{""}
                {cart.shippingAddress.city},{""}
                {cart.shippingAddress.postalCode}
              </p>
            </div>
            <div>
              <h2>Payement Method</h2>
              <strong>Method:</strong>
              {cart.paymentMethod}
            </div>
          </div>
          <button
            type="button"
            className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-[60%] mt-4 ml-[5rem] "
            disabled={cart.cartItems.length === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>
          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
