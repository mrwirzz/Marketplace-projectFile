class OrderService {
  constructor(
    logger,
    orderRepository,
    orderDetailRepository,
    productRepository,
    transactor
  ) {
    this.orderRepository = orderRepository;
    this.orderDetailRepository = orderDetailRepository;
    this.productRepository = productRepository;
    this.logger = logger;
    this.transactor = transactor;
  }

  async create(data) {
    const op = "services.order.create";
    const message = { op: op };
    this.logger.info("", message);

    const { userId, products } = data;

    const order = this.transactor.runInTransaction(async () => {
      let totalPrice = 0;

      products.forEach((product) => {
        const price = this.productRepository.getById(product.productId);
        if (price) {
          totalPrice += price * product.quantity;
          product.price = price;
        } else {
          throw new Error(`Price for productId ${item.productId} not found`);
        }
      });

      const orderData = { userId: userId, totalPrice: totalPrice };

      const orderId = await this.orderRepository.create(orderData);
      for (const product of products) {
        await this.orderDetailRepository.create(orderId, product);
      }
    });

    // TODO: nothing returns, we need to return order ID
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
