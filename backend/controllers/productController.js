import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;
    // !validation
    switch (true) {
      case !name:
        return res.json("name is required");
      case !brand:
        return res.json("brand is required");
      case !quantity:
        return res.json("quantity is required");
      case !category:
        return res.json("category is required");
      case !price:
        return res.json("price is required");
      case !description:
        return res.json("description is required");
    }
    const product = new Product({ ...req.fields });
    await product.save();
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

const updateProductDetails = asyncHandler(async (req, res) => {
  const { name, description, price, category, quantity, brand } = req.fields;
  // !validation
  switch (true) {
    case !name:
      return res.json("name is required");
    case !brand:
      return res.json("brand is required");
    case !quantity:
      return res.json("quantity is required");
    case !category:
      return res.json("category is required");
    case !price:
      return res.json("price is required");
    case !description:
      return res.json("description is required");
  }

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );
    await product.save();
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});
const removeProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  res.json(product);
});

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);

    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});
const fetchProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product Not Found");
    }
  } catch (error) {
    console.log(error);
    res.status(404).json(error.message);
  }
});
const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.json(error.message);
  }
});
const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("product already reviewed");
      }
      const review = {
        name: req.user.userName,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, review) => review.rating + acc, 0) /
        product.reviews.length;
      await product.save();
      res.status(201).json({ message: "review Added" });
    } else {
      res.status(404);
      throw new Error("Product Not Found");
    }
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
});
const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.json(products);
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
});

const fetchNewProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(4);
  res.json(products);
});
const filterProduct = asyncHandler(async (req, res) => {
  try {
    const { checked = [], radio = [] } = req.body;
    const args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gt: radio[0], $lt: radio[1] };
    const products = await Product.find(args);
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});
export {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProduct,
};
