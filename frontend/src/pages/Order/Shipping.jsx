import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps.jsx";

const Shipping = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [adress, setAdress] = useState(shippingAddress.adress || "");
  const [codePostal, setCodePostal] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  useEffect(() => {
    if (!shippingAddress.adress) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ city, adress, codePostal, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <div className="container mx-auto mt-10">
      <ProgressSteps step1 step2 />
      <div className="mt-[10rem] flex justify-around items-center flex-wrap">
        <form onSubmit={submitHandler} className="w-[40rem]">
          <h1 className="text-2xl font-serif font-semibold mb-4">Shipping :</h1>
          <div className="mb-4">
            <label className="block text-white mb-2">Address</label>
            <input
              type="text"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
              required
              className="w-full p-2 border rounded"
              placeholder="Enter address"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="w-full p-2 border rounded"
              placeholder="Enter city"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">PostalCode</label>
            <input
              type="text"
              value={codePostal}
              onChange={(e) => setCodePostal(e.target.value)}
              required
              className="w-full p-2 border rounded"
              placeholder="Enter code Postal"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="w-full p-2 border rounded"
              placeholder="Enter country"
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Select Method</label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value={"PayPal"}
                  name="paymentMethod"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  required
                  className="form-radio text-pink-500"
                  checked={paymentMethod === "PayPal"}
                />
                <span className="ml-2 text-black font-serif font-semibold">
                  PayPal or Credit Card
                </span>
              </label>
            </div>
          </div>
          <button
            className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full"
            type="submit"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
