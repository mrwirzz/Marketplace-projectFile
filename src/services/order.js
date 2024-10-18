class OrderService {
  constructor(logger, orderRepository, orderDetailsRepository) {
    this.orderRepository = orderRepository;
    this.orderDetailsRepository = orderDetailsRepository;
    this.logger = logger;
  }

  async create(data) {
    const op = "services.order.create";
    const message = { op: op };
    this.logger.info("", message);

    // TODO: logic
    // We have:
    // UserID
    // Array of productId with quantity
    // In transaction:
    // 1. Get product prices, count totalPrice
    // 2. Create order
    // 3. Create order_details for every product
    const order = await this.orderRepository.create(data);
    return order;
  }

  async getAll() {
    const op = "services.order.getAll";
    const message = { op: op };
    this.logger.info("", message);

    const orders = await this.orderRepository.getAll();
    return orders;
  }

  async getById(id) {
    const op = "services.order.getById";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const order = await this.orderRepository.getById(id);
    return order;
  }

  async update(id, data) {
    const op = "services.order.update";
    const message = { op: op, id: id };
    this.logger.info("", message);

    // TODO: we need to be able to add, remove, modify order_details (in transaction)
    // Modify totalPrice
    const order = await this.orderRepository.update(id, data);
    return order;
  }

  async delete(id) {
    const op = "services.order.delete";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const order = await this.orderRepository.delete(id);
    return order;
  }
}

module.exports = OrderService;
