class OrderRepository {
  constructor(logger, db) {
    this.logger = logger;
    this.db = db;
  }

  async create(data) {
    const { userId, totalPrice } = data;

    const op = "repositories.order.create";
    const message = { op: op, userId: userId, totalPrice: totalPrice };
    this.logger.info("", message);

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
      const query = `
      SELECT
        orders.id as orderId,
        orders.totalPrice,
        orders.userId,
        user.name as userName, 
        order_details.productId,
        products.name as productName,
        order_details.quantity,
        order_details.price
      FROM orders as orders
      LEFT JOIN users as user ON orders.userId = user.id
      LEFT JOIN order_details as order_details ON orders.id = order_details.orderId
      LEFT JOIN products as products ON order_details.productId = products.id
    `;

      this.db.all(query, [], function (err, rows) {
        if (err) {
          return reject(err);
        }
        const orders = groupByOrders(rows);
        resolve(orders);
      });
    });
  }

  async getById(id) {
    const op = "repositories.order.getById";
    const message = { op: op, id: id };
    this.logger.info("", message);

    return new Promise((resolve, reject) => {
      const query = `
      SELECT
        orders.id as orderId,
        orders.totalPrice,
        orders.userId,
        user.name as userName, 
        order_details.productId,
        products.name as productName,
        order_details.quantity,
        order_details.price
      FROM orders as orders
      LEFT JOIN users as user ON orders.userId = user.id
      LEFT JOIN order_details as order_details ON orders.id = order_details.orderId
      LEFT JOIN products as products ON order_details.productId = products.id
      WHERE orders.id = ?
    `;
      this.db.all(query, [id], function (err, rows) {
        if (err) {
          return reject(err);
        }
        const orders = groupByOrders(rows);
        // TODO: What's the best way to do it to return only one order because we only have one order?
        resolve(orders[0]);
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

function groupByOrders(rows) {
  // Group the data by orders
  const ordersMap = new Map();
  rows.forEach((row) => {
    if (!ordersMap.has(row.orderId)) {
      ordersMap.set(row.orderId, {
        orderId: row.orderId,
        totalPrice: row.totalPrice,
        userName: row.userName,
        products: [],
      });
    }
    const order = ordersMap.get(row.orderId);
    order.products.push({
      productId: row.productId,
      productName: row.productName,
      quantity: row.quantity,
      price: row.price,
    });
  });

  // Convert the map to an array of orders
  const orders = Array.from(ordersMap.values());
  return orders;
}

module.exports = OrderRepository;
