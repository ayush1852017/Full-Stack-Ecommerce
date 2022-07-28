const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProducts,
  deleteProduct,
  getProductDetails,
  createProductReview,
} = require("../Controllers/product.controller");
const { isAuthUser, authorizeRoles } = require("../Middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/admin/products/new")
  .post(isAuthUser, authorizeRoles("admin"), createProduct);
router
  .route("/admin/products/:id")
  .put(isAuthUser, authorizeRoles("admin"), updateProducts)
  .delete(isAuthUser, authorizeRoles("admin"), deleteProduct);
router.route("/products/:id").get(getProductDetails);
router.route("/review").put(isAuthUser, createProductReview);
module.exports = router;
