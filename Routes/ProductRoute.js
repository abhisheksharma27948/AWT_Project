const express = require('express');

const { createProductController, updateProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController } = require("../Controller/ProductController");

const { isAdmin, requireSignIn } = require("../Middleware/authMiddleware");

const formidable = require("express-formidable");

const router = express.Router();

//create product
router.post("/create-product", requireSignIn, isAdmin, formidable(),
  createProductController
);

//update product
router.put(
  "/update-product/:pid", requireSignIn, isAdmin, formidable(), updateProductController
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:slug", getSingleProductController);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete product
router.delete("/delete-product/:pid", deleteProductController);

module.exports = router; 