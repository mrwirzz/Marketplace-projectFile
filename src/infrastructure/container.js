// pattern: Dependency Injection Container
const connectDB = require("../config/db");
const logger = require("../utils/logger");

const Transactor = require("../utils/transactor");

const CategoryRepository = require("../repositories/category");
const CategoryService = require("../services/category");
const CategoryController = require("../controllers/category");

const ProductRepository = require("../repositories/product");

const OrderRepository = require("../repositories/order");
const OrderService = require("../services/order");
const OrderController = require("../controllers/order");

const OrderDetailRepository = require("../repositories/order-detail");

const container = async () => {
  const db = await connectDB();

  const transactor = new Transactor(db);

  const categoryRepository = new CategoryRepository(logger, db);
  const categoryService = new CategoryService(logger, categoryRepository);
  const categoryController = new CategoryController(logger, categoryService);

  const productRepository = new ProductRepository(logger, db);

  const orderDetailRepository = new OrderDetailRepository(logger, db);

  const orderRepository = new OrderRepository(logger, db);
  const orderService = new OrderService(
    logger,
    orderRepository,
    orderDetailRepository,
    productRepository,
    transactor
  );
  const orderController = new OrderController(logger, orderService);

  const container = {
    categoryController: categoryController,
    orderController: orderController,
  };

  return container;
};

module.exports = container();
