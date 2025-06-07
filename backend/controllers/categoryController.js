import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModel.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.json({ message: "Name is Required" });
    }
    const existingcategory = await Category.findOne({ name });
    if (existingcategory) {
      return res.json({ message: "Category Already Exist" });
    }
    const category = await new Category({ name }).save();
    res.json(category);
  } catch (error) {
    console.error(error.message);
    return res.status(400).json(error);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;
    const category = await Category.findOne({ _id: categoryId });
    if (!category) {
      return res.json({ message: "category Not Found" });
    }
    category.name = name;
    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
});

const removeCategory = asyncHandler(async (req, res) => {
  try {
    const removed = await Category.findByIdAndDelete(req.params.categoryId);
    return res.json(removed);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error);
  }
});
const listCategory = asyncHandler(async (req, res) => {
  const all = await Category.find({});
  return res.status(200).json(all); 
});
const readCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    return res.json(category);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
export {
  createCategory,
  updateCategory,
  removeCategory,
  listCategory,
  readCategory,
};
