/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("categories").del();
  await knex("categories").insert([
    { id: 1, categoryName: "Laptop" },
    { id: 2, categoryName: "Smartphone" },
    { id: 3, categoryName: "Router" },
    { id: 4, categoryName: "Powerful" },
    { id: 5, categoryName: "Light" },
  ]);
};
