class OrderController {
  constructor(logger, orderService) {
    this.orderService = orderService;
    this.logger = logger;

    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  // Create order
  async create(req, res) {
    try {
      const op = "controllers.order.create";
      const message = { op: op };
      this.logger.info("", message);

      const order = await this.orderService.create(req.body);
      res.status(201).json({
        status: "success",
        data: order,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  // Get all orders
  async getAll(req, res) {
    try {
      const op = "controllers.order.getAll";
      const message = { op: op };
      this.logger.info("", message);

      const orders = await this.orderService.getAll();
      res.status(200).json({
        status: "success",
        data: orders,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  // Get order by ID
  async getById(req, res) {
    try {
      const op = "controllers.order.getById";
      const message = { op: op, id: req.params.id };
      this.logger.info("", message);

      const order = await this.orderService.getById(req.params.id);
      if (!order) {
        return res.status(404).json({
          status: "fail",
          message: "Order not found",
        });
      }
      res.status(200).json({
        status: "success",
        data: order,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  // Update order
  async update(req, res) {
    try {
      const op = "controllers.order.update";
      const message = { op: op, id: req.params.id };
      this.logger.info("", message);

      const order = await this.orderService.update(req.params.id, req.body);
      if (!order) {
        return res.status(404).json({
          status: "fail",
          message: "Order not found",
        });
      }
      res.status(200).json({
        status: "success",
        data: order,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }

  // Delete order
  async delete(req, res) {
    try {
      const op = "controllers.order.delete";
      const message = { op: op, id: req.params.id };
      this.logger.info("", message);

      const order = await this.orderService.delete(req.params.id);
      if (!order) {
        return res.status(404).json({
          status: "fail",
          message: "Order not found",
        });
      }
      res.status(204).json({
        status: "success",
        data: null,
      });
    } catch (err) {
      this.logger.error(err);
      res.status(400).json({
        status: "fail",
        message: err.message,
      });
    }
  }
}

module.exports = OrderController;
