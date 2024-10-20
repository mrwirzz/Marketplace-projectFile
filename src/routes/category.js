const express = require("express");
const container = require("../infrastructure/container");
const router = express.Router();

container.then(({ categoryController }) => {
  // CRUD routes for Category
  router.post("/", categoryController.create); // Create category
  router.get("/", categoryController.getAll); // Get all categories
  router.get("/:id", categoryController.getById); // Get category by ID
  router.put("/:id", categoryController.update); // Update category by ID
  router.delete("/:id", categoryController.delete); // Delete category by ID
});

module.exports = router;
