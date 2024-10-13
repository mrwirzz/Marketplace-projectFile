/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("order_details", function (table) {
    table.increments("id").primary();
    table.integer("orderId").unsigned().notNullable();
    table.integer("productId").unsigned().notNullable();
    table.integer("quantity").notNullable();
    table.decimal("price", 10, 2).notNullable();

    table
      .foreign("orderId")
      .references("id")
      .inTable("orders")
      .onDelete("CASCADE");
    table
      .foreign("productId")
      .references("id")
      .inTable("products")
      .onDelete("CASCADE");

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("orderdetails");
};
