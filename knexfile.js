require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      filename: process.env.DB_FILENAME,
    },
    useNullAsDefault: true,
    // DB settings
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", (err) => {
          if (err) {
            console.error("Error enabling foreign keys: ", err);
          } else {
            console.log("Foreign keys enabled.");
          }
          done(err, conn);
        });
      },
    },
    // migrations info
    migrations: {
      tableName: "knex_migrations",
      directory: process.env.MIGRATIONS_FOLDER,
    },
    // seeds info
    seeds: {
      directory: process.env.SEEDS_FOLDER,
    },
  },
};
