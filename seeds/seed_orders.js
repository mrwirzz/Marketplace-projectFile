/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('orders').del()
  await knex('orders').insert([
    { id: 1, userId: 1, totalPrice: 739.97 },
    { id: 2, userId: 2, totalPrice: 19.99 },
    { id: 3, userId: 3, totalPrice: 1359.96 }
  ]);
};
