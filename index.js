require("dotenv").config();
const express = require("express");

const categoryRoutes = require("./src/routes/category");
const logger = require("./src/utils/logger");

const app = express();
app.use(express.json());

app.use("/api/v1/categories", categoryRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  logger.info(`Listening on ${port}`);
});
