const express = require("express");
const container = require("../infrastructure/container");
const router = express.Router();

container.then(({ orderController }) => {
  // CRUD routes for Order
  router.post("/", orderController.create); // Create order
  router.get("/", orderController.getAll); // Get all orders
  router.get("/:id", orderController.getById); // Get order by ID
  router.put("/:id", orderController.update); // Update order by ID
  router.delete("/:id", orderController.delete); // Delete order by ID
});

module.exports = router;
