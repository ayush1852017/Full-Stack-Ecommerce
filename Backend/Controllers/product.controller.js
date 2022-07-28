const Product = require("../Models/products.model");
const ErrorHandler = require("../utils/error.handler");
const catchAsyncError = require("../Middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/api.features");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
//Create a new Product object with the specified properties

exports.createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get All Products && This is Admin Route

exports.getAllProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Product.countDocuments();
  const apifeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apifeatures.query;

  res.status(200).json({ success: true, products, productCount });
});

//Get Single Product Details

exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

// Update Products && This is Admin Route

exports.updateProducts = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndUpdate: false,
  });
  res.status(200).json({ success: true, product });
});

// Delete a product from the store && Admin Route

exports.deleteProduct = catchAsyncError(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "Product not found",
    });
  }
  await product.remove();
  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully" });
});

// Create a new Review and update the existing
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((rev) => (avg += rev.rating));
  product.ratings = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});
