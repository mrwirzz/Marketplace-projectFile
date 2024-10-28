class VendorRepository {
    constructor(db) {
      this.db = db;
    }
  
    async create(data) {
      const [id] = await this.db("vendors").insert(data).returning("id");
      return id;
    }
  
    async getAll() {
      return this.db("vendors").select("*");
    }
  
    async getById(id) {
      return this.db("vendors").where({ id }).first();
    }
  
    async update(id, data) {
      return this.db("vendors").where({ id }).update(data);
    }
  
    async delete(id) {
      return this.db("vendors").where({ id }).del();
    }
  }
  
  module.exports = VendorRepository;