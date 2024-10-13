/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    // TODO: password must be cached
    { id: 1, name: "Denis", email: "denis@gmail.com", password: "password1" },
    {
      id: 2,
      name: "Vladislav",
      email: "vladislav@gmail.com",
      password: "password2",
    },
    { id: 3, name: "Dor", email: "dor@gmail.com", password: "password3" },
  ]);
};
