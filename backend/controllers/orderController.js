import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

function calcPrices(orderItems) {
  const itemsPrice = orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const shippingPrice = itemsPrice >= 100 ? 0 : 10;
  const taxRate = 0.15;
  const taxPrice = (itemsPrice * taxRate).toFixed(2);
  const totalPrice = (
    itemsPrice +
    shippingPrice +
    parseFloat(taxPrice)
  ).toFixed(2);
  console.log("total", typeof totalPrice);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice,
    totalPrice: parseFloat(totalPrice),
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
    console.log("🧾 dbOrderItems:", dbOrderItems);
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
const getAllorders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id username");
    res.json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});

const getUserOrders = asyncHandler(async (req, res) => {
  try {
    const userOrders = await Order.find({ user: req.user._id });
    res.json(userOrders);
  } catch (error) {
    res.status(500).josn(error);
  }
});
const countTotalOrders = asyncHandler(async (req, res) => {
  try {
    const count = await Order.countDocuments();
    res.json(count);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
const calculateTotalSales = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find({});
    const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    res.json(totalSales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
const calculateTotalSalesByDate = asyncHandler(async (req, res) => {
  try {
    const salesByDate = await Order.aggregate([
      {
        $match: {
          isPaid: true,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$paidAt" },
          },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);
    res.json(salesByDate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
const findOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "username email"
    );
    if (order) {
      res.json(order);
    } else {
      throw new Error("the order not found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
const markOrderAsPaid = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.payemntResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_adress: req.body.email_adress,
      };
      const updateOrder = await order.save();
      res.json(updateOrder);
    } else {
      res.status(404);
      throw new Error("Order not Found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
const markOrderAsDelivered = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivred = true;
      order.deliveredAt = Date.now();
      const updateOrder = await order.save();
      res.json(updateOrder);
    } else {
      res.status(404);
      throw new Error("order Not Found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export {
  createOrder,
  getAllorders,
  getUserOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
};
