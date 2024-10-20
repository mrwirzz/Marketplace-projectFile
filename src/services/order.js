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

    const order = await this.transactor.runInTransaction(async () => {
      let totalPrice = 0;

      // TODO: collapse products by id

      products.forEach((product) => {
        //const price = await this.productRepository.getById(product.productId);
        const price = 10;
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

      return { orderId: orderId, totalPrice: totalPrice };
    });

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

    const { products } = data;

    // TODO: collapse products by id

    const order = await this.transactor.runInTransaction(async () => {
      // Find the existing order and order details
      const order = await this.orderRepository.getById(id);
      if (!order) {
        throw new Error(`Order with ID ${id} not found`);
      }

      const { orderId } = order;
      const existingOrderDetails = order.products;

      let totalPrice = 0;

      // Compare request products with existing ones
      for (const product of products) {
        const existingOrderDetail = existingOrderDetails.find(
          (detail) => detail.productId === product.productId
        );
        // If product exists, update it
        if (existingOrderDetail) {
          //const price = await this.productRepository.getById(product.productId);
          const price = 10;
          if (price) {
            product.price = price;
            totalPrice += price * product.quantity;
          } else {
            throw new Error(
              `Price for productId ${product.productId} not found`
            );
          }

          // If anything has changed
          if (
            existingOrderDetail.price !== price ||
            existingOrderDetail.quantity !== product.quantity
          ) {
            await this.orderDetailRepository.update(orderId, product);
          }
        } else {
          // If product is new, add it
          //const price = await this.productRepository.getById(product.productId);
          const price = 10;
          if (price) {
            product.price = price;
            totalPrice += price * product.quantity;
          } else {
            throw new Error(
              `Price for productId ${product.productId} not found`
            );
          }

          await this.orderDetailRepository.create(orderId, product);
        }
      }

      // Mark products for deletion
      const toDelete = [];

      existingOrderDetails.forEach((existingOrderDetail) => {
        if (
          !products.find(
            (product) => product.productId === existingOrderDetail.productId
          )
        ) {
          toDelete.push(existingOrderDetail.productId);
        }
      });

      // Delete products not present in the request
      for (const productId of toDelete) {
        await this.orderDetailRepository.delete(id, productId);
      }

      // Update the order totalPrice
      if (order.totalPrice !== totalPrice) {
        await this.orderRepository.update(id, { totalPrice });
      }

      // Return the updated order
      return { orderId: id, totalPrice: totalPrice };
    });

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
