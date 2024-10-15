/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("product_categories", function (table) {
    table.increments("id").primary();
    table.integer("productId").unsigned().notNullable();
    table.integer("categoryId").unsigned().notNullable();

    table
      .foreign("productId")
      .references("id")
      .inTable("products")
      .onDelete("CASCADE");
    table
      .foreign("categoryId")
      .references("id")
      .inTable("categories")
      .onDelete("CASCADE");

    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("product_categories");
};
