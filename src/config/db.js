const sqlite3 = require("sqlite3");
const logger = require("../utils/logger");

let db;

function connectDB() {
  if (!db) {
    db = new sqlite3.Database(process.env.DB_FILENAME, (err) => {
      if (err) {
        logger.error("DB connection failed", { err: err.message });
        throw err;
      } else {
        logger.info("DB connected");

        // Enable foreign key constraints
        db.run("PRAGMA foreign_keys = ON", (err) => {
          if (err) {
            logger.error("Failed to enable foreign key constraints", {
              err: err.message,
            });
          } else {
            logger.info("Foreign key constraints enabled");
          }
        });
      }
    });
  }
  return db;
}

module.exports = connectDB;
