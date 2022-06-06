const express = require("express");

const productController = require("./../controllers/productController");
const authController = require("./../controllers/authController");

const router = express.Router();

//protect all the routes below

router.use(authController.protect);

router
  .route("/")
  .get(productController.getAllProducts)
  .post(
    authController.restrictTo("admin", "partner_admin"),
    productController.createProduct
  );

router
  .route("/:id")
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(
    authController.restrictTo("admin", "partner_admin"),
    productController.deleteProduct
  );

module.exports = router;
