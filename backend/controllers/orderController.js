import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";

const createOrder = asyncHandler(async (req, res) => {
  try {
    res.send("hello order");
  } catch (error) {
    console.log(error.message);
  }
});

export { createOrder };
