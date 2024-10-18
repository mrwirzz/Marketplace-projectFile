class Transactor {
  constructor(db) {
    this.db = db;
  }

  async runInTransaction(transactionFn) {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run("BEGIN TRANSACTION", (err) => {
          if (err) {
            return reject("Failed to start transaction: " + err.message);
          }

          // Execute the transaction function passed as a parameter
          transactionFn()
            .then(() => {
              this.db.run("COMMIT", (err) => {
                if (err) {
                  this.db.run("ROLLBACK");
                  return reject("Transaction commit failed: " + err.message);
                }
                resolve();
              });
            })
            .catch((err) => {
              this.db.run("ROLLBACK", () => {
                reject("Transaction rolled back: " + err.message);
              });
            });
        });
      });
    });
  }
}

module.exports = Transactor;
