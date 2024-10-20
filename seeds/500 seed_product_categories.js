/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('product_categories').del()
  await knex('product_categories').insert([
    { productId: 1, categoryId: 1 },
    { productId: 1, categoryId: 4 },
    { productId: 2, categoryId: 1 },
    { productId: 2, categoryId: 5 },
    { productId: 3, categoryId: 3 },
  ]);
};
