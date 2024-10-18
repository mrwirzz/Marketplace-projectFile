// pattern: Dependency Injection Container
const connectDB = require("../config/db");
const logger = require("../utils/logger");

const CategoryRepository = require("../repositories/category");
const CategoryService = require("../services/category");
const CategoryController = require("../controllers/category");

const OrderRepository = require("../repositories/order");
const OrderService = require("../services/order");
const OrderController = require("../controllers/order");

const OrderDetailsRepository = require("../repositories/order-details");

const container = async () => {
  const db = await connectDB();

  const categoryRepository = new CategoryRepository(logger, db);
  const categoryService = new CategoryService(logger, categoryRepository);
  const categoryController = new CategoryController(logger, categoryService);

  const orderDetailsRepository = new OrderDetailsRepository(logger, db);

  const orderRepository = new OrderRepository(logger, db);
  const orderService = new OrderService(
    logger,
    orderRepository,
    orderDetailsRepository
  );
  const orderController = new OrderController(logger, orderService);

  const container = {
    categoryController: categoryController,
    orderController: orderController,
  };

  return container;
};

module.exports = container();
