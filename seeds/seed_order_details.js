/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('order_details').del()
  await knex('order_details').insert([
    { id: 1, orderId: 1, productId: 1, quantity: 1, price: 699.99 },
    { id: 2, orderId: 1, productId: 3, quantity: 2, price: 19.99 },
    { id: 3, orderId: 2, productId: 3, quantity: 1, price: 19.99 },
    { id: 4, orderId: 3, productId: 3, quantity: 3, price: 19.99 },
    { id: 5, orderId: 3, productId: 2, quantity: 1, price: 1299.99 }
  ]);
};
