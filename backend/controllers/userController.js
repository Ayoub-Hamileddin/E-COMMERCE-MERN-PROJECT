import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import craeteToken from "../utils/createToken.js";

// ------------ create user ----------
const createUser = asyncHandler(async (req, res) => {
  const { userName, email, password } = req.body;
  if (!userName || !email || !password) {
    throw new Error("Please fill all the inputs");
  }
  const userExists = await User.findOne({ email });
  if (userExists) res.status(400).send("user already exists");

  // ---- hash the password---
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({ userName, email, password: hashedPassword });

  try {
    await newUser.save();
    craeteToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    throw new Error("invalid data");
  }
});
// ------------ login -------------
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const exisitingUser = await User.findOne({ email });
  if (exisitingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      exisitingUser.password
    );

    if (isPasswordValid) {
      craeteToken(res, exisitingUser._id);
      res.status(201).json({
        _id: exisitingUser._id,
        userName: exisitingUser.userName,
        email: exisitingUser.email,
        isAdmin: exisitingUser.isAdmin,
      });
      return;
    } else {
      res.status(404);
      throw new Error("password is incorrecte");
    }
  } else {
    res.status(404);
    throw new Error("user Not Found");
  }
});

const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httponly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "logged out seccessfuly" });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.userName = req.body.userName || user.userName;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashUpdatedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashUpdatedPassword;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      userName: updatedUser.userName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("user Not found");
  }
});

// ---------- admin ---------
const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("cannot delete admin user");
    }
    await user.deleteOne({ _id: user.id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

const GetUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});
const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.userName = req.body.userName || user.userName;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin) || user.isAdmin;
    const updateUser = await user.save();
    res.json({
      _id: updateUser._id,
      userName: updateUser.userName,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  GetUserById,
  updateUserById,
};
