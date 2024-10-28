require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const container = require("./src/infrastructure/container");

const categoryRoutes = require("./src/routes/category");
const orderRoutes = require("./src/routes/order");
const authRoutes = require("./src/routes/authRoutes");
const authenticate = require("./src/auth/authMiddleware");

const logger = require("./src/utils/logger");

const app = express();
app.use(express.json());

(async () => {
  try {
    await connectDB();
    
    const { categoryController, orderController, authController } = await container();

    app.use("/api/v1/auth", authRoutes(authController));
    
    app.use("/api/v1/categories", authenticate, categoryRoutes(categoryController));
    app.use("/api/v1/orders", authenticate, orderRoutes(orderController));
    
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      logger.info(`Listening on port ${port}`);
    });
  } catch (error) {
    logger.error("Failed to start the server", error.message);
    process.exit(1);
  }
})();