const express = require('express');

const {
  categoryControlller, createCategoryController, deleteCategoryController, singleCategoryController,
  updateCategoryController,
} = require("../Controller/CategoryController.js");

const { isAdmin, requireSignIn } = require("../Middleware/authMiddleware.js");

const router = express.Router();

//routes
// create category
router.post(
  "/create-category", requireSignIn, isAdmin, createCategoryController);

//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//getALl category
router.get("/get-category", categoryControlller);

//single category
router.get("/single-category/:id", singleCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

module.exports = router; 
