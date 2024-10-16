// pattern: Dependency Injection Container
const connectDB = require("../config/db");
const logger = require("../utils/logger");

const CategoryRepository = require("../repositories/category");
const CategoryService = require("../services/category");
const CategoryController = require("../controllers/category");

const container = async () => {
  const db = await connectDB();

  const categoryRepository = new CategoryRepository(logger, db);
  const categoryService = new CategoryService(logger, categoryRepository);
  const categoryController = new CategoryController(logger, categoryService);

  const container = {
    categoryController: categoryController,
  };

  return container;
};

module.exports = container();
