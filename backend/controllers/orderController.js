import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

function calcPrices(orderItems) {
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const shippingPrice = itemsPrice > 100 ? 100 : 0;
  const taxRate = 0.15;
  const taxPrice = (itemsPrice * taxRate).toFixed(2);
  const totalPrice = itemsPrice + taxPrice + parseFloat(taxPrice).toFixed(2);
  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice,
    totalPrice,
  };
}

const createOrder = asyncHandler(async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;
    if (orderItems && orderItems.length === 0) {
      res.status(404);
      throw new Error("no order Items");
    }
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });
    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDb) => itemFromDb._id.toString() === itemFromClient._id
      );
      if (!matchingItemFromDB) {
        res.status(404);
        throw new Error(`Product not Found ${itemFromClient._id} `);
      }
      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        _id: undefined,
      };
    });
    const { totalPrice, taxPrice, shippingPrice, itemsPrice } =
      calcPrices(dbOrderItems);
    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createOrder = await order.save();
    res.status(201).json(createOrder);
  } catch (error) {
    console.log(error.message);
  }
});

export { createOrder };
