const ErrorHandler = require("../utils/error.handler");
const catchAsyncError = require("../Middleware/catchAsyncErrors");
const User = require("../Models/user.model");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: { public_id: "this is sample public id", url: "sample url" },
  });
  const token = user.getJWTToken();
  res.status(201).json({
    success: true,
    token,
  });
});

// Login User

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  // Check if the user has given email and password both
  if (!email || !password) {
    return next(new ErrorHandler("Enter your email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const token = user.getJWTToken();
  res.status(200).json({
    success: true,
    token,
  });
});
