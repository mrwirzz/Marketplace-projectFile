/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("vendors").del();
  await knex("vendors").insert([
    { id: 1, name: "Sony", email: "sony@gmail.com.com", rating: 4.5 },
    { id: 2, name: "Panasonic", email: "panasonic@gmail.com.com", rating: 3.9 },
    { id: 3, name: "Cisco", email: "cisco@gmail.com.com", rating: 4.9 },
  ]);
};
