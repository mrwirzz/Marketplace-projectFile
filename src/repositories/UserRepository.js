class UserRepository {
    constructor(db) {
      this.db = db;
    }
  
    async create(data) {
      const [id] = await this.db("users").insert(data).returning("id");
      return id;
    }
  
    async getAll() {
      return this.db("users").select("*");
    }
  
    async getById(id) {
      return this.db("users").where({ id }).first();
    }
  
    async update(id, data) {
      return this.db("users").where({ id }).update(data);
    }
  
    async delete(id) {
      return this.db("users").where({ id }).del();
    }
  }
  
  module.exports = UserRepository;