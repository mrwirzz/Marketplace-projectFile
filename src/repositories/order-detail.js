class OrderDetailRepository {
  constructor(logger, db) {
    this.logger = logger;
    this.db = db;
  }

  async create(orderId, data) {
    const op = "repositories.order-detail.create";
    const message = { op: op, orderId: orderId};
    this.logger.info("", message);

    const { productId, quantity, price } = data;

    return new Promise((resolve, reject) => {
      const query = `INSERT INTO order_details (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)`;
      this.db.run(query, [orderId, productId, quantity, price], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.lastID);
      });
    });
  }
}

module.exports = OrderDetailRepository;
