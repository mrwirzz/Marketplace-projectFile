class CategoryService {
  constructor(logger, categoryRepository) {
    this.categoryRepository = categoryRepository;
    this.logger = logger;
  }

  async create(categoryData) {
    const op = "services.category.create";
    const message = { op: op };
    this.logger.info("", message);

    const category = await this.categoryRepository.create(categoryData);
    return category;
  }

  async getAll() {
    const op = "services.category.getAll";
    const message = { op: op };
    this.logger.info("", message);

    const categories = await this.categoryRepository.getAll();
    return categories;
  }

  async getById(id) {
    const op = "services.category.getById";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const category = await this.categoryRepository.getById(id);
    return category;
  }

  async update(id, categoryData) {
    const op = "services.category.update";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const category = await this.categoryRepository.update(id, categoryData);
    return category;
  }

  async delete(id) {
    const op = "services.category.delete";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const category = await this.categoryRepository.delete(id);
    return category;
  }
}

module.exports = CategoryService;
