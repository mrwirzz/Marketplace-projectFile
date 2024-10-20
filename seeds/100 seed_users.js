const bcrypt = require("bcrypt");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  // Prepare data
  const saltRounds = parseInt(process.env.SALT_ROUNDS);

  const password1 = await bcrypt.hash("password1", saltRounds);
  const password2 = await bcrypt.hash("password2", saltRounds);
  const password3 = await bcrypt.hash("password3", saltRounds);

  await knex("users").insert([
    { id: 1, name: "Denis", email: "denis@gmail.com", password: password1 },
    {
      id: 2,
      name: "Vladislav",
      email: "vladislav@gmail.com",
      password: password2,
    },
    { id: 3, name: "Dor", email: "dor@gmail.com", password: password3 },
  ]);
};
