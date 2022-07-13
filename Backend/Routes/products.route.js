const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProducts,
  deleteProduct,
  getProductDetails,
} = require("../Controllers/product.controller");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/new").post(createProduct);
router
  .route("/products/:id")
  .put(updateProducts)
  .delete(deleteProduct)
  .get(getProductDetails);
module.exports = router;
