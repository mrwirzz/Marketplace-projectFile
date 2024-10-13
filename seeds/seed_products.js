/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("products").del();
  await knex("products").insert([
    {
      id: 1,
      name: "Laptop",
      description: "A powerful laptop",
      price: 699.99,
      vendorId: 2,
    },
    {
      id: 2,
      name: "Laptop",
      description: "A lightweight laptop",
      price: 1299.99,
      vendorId: 1,
    },
    {
      id: 3,
      name: "Router",
      description: "A wi-fi router",
      price: 19.99,
      vendorId: 3,
    },
  ]);
};
