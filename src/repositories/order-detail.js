class OrderDetailRepository {
  constructor(logger, db) {
    this.logger = logger;
    this.db = db;
  }

  async create(orderId, data) {
    const { productId, quantity, price } = data;

    const op = "repositories.order-detail.create";
    const message = {
      op: op,
      orderId: orderId,
      productId: productId,
      quantity: quantity,
      price: price,
    };
    this.logger.info("", message);

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

  async update(orderId, data) {
    const { productId, quantity, price } = data;

    const op = "repositories.order-detail.update";
    const message = {
      op: op,
      orderId: orderId,
      productId: productId,
      quantity: quantity,
      price: price,
    };
    this.logger.info("", message);

    return new Promise((resolve, reject) => {
      const query = `
      UPDATE order_details
      SET quantity = ?, price = ?, updated_at = CURRENT_TIMESTAMP
      WHERE orderId = ? AND productId = ?;
      `;
      this.db.run(query, [quantity, price, orderId, productId], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes);
      });
    });
  }

  async delete(orderId, productId) {
    const op = "repositories.order-detail.delete";
    const message = { op: op, orderId: orderId, productId: productId };
    this.logger.info("", message);

    return new Promise((resolve, reject) => {
      const query = `
      DELETE FROM order_details
      WHERE orderId = ? AND productId = ?
      `;
      this.db.run(query, [orderId, productId], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes);
      });
    });
  }
}

module.exports = OrderDetailRepository;
