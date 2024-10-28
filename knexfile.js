// Update with your config settings.
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
    migrations: {
      tableName: "knex_migrations",
      directory: process.env.MIGRATIONS_FOLDER,
    },
    seeds: {
      directory: process.env.SEEDS_FOLDER,
    },
  },

  /**
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
    */
};
