class OrderRepository {
  constructor(logger, db) {
    this.logger = logger;
    this.db = db;
  }

  async create(data) {
    const op = "repositories.order.create";
    const message = { op: op, userId: userId, totalPrice: totalPrice };
    this.logger.info("", message);

    const { userId, totalPrice } = data;

    return new Promise((resolve, reject) => {
      const query = `INSERT INTO orders (userId, totalPrice) VALUES (?, ?)`;
      this.db.run(query, [userId, totalPrice], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.lastID);
      });
    });
  }

  async getAll() {
    const op = "repositories.order.getAll";
    const message = { op: op };
    this.logger.info("", message);

    return new Promise((resolve, reject) => {
      // TODO: add user name, add order_details
      const query = `SELECT * FROM orders`;
      this.db.all(query, [], function (err, rows) {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  async getById(id) {
    const op = "repositories.order.getById";
    const message = { op: op, id: id };
    this.logger.info("", message);

    return new Promise((resolve, reject) => {
      // TODO: add user name, add order_details
      const query = `SELECT * FROM orders WHERE id = ?`;
      this.db.get(query, [id], function (err, row) {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  }

  async update(id, data) {
    const op = "repositories.order.update";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const { totalPrice } = data;

    return new Promise((resolve, reject) => {
      const query = `UPDATE orders SET totalPrice = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
      this.db.run(query, [totalPrice, id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes);
      });
    });
  }

  async delete(id) {
    const op = "repositories.order.delete";
    const message = { op: op, id: id };
    this.logger.info("", message);

    return new Promise((resolve, reject) => {
      const query = `DELETE FROM orders WHERE id = ?`;
      this.db.run(query, [id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes);
      });
    });
  }
}

module.exports = OrderRepository;
