const CategoryService = require('./category');
const CategoryRepository = require('../repositories/category');

// Mocking the repository
jest.mock('../repositories/category');

describe('Category Service', () => {
  let categoryService;
  let logger;

  beforeEach(() => {
    // Mock logger
    logger = { info: jest.fn() };
    // Reset the mocks before each test
    CategoryRepository.mockClear();
    const categoryRepository = new CategoryRepository(logger, {}); // Mock db object
    categoryService = new CategoryService(logger, categoryRepository);
  });

  test('should create a category successfully', async () => {
    const categoryData = { name: 'Electronics' };

    // Mock the repository method to resolve a value
    categoryService.categoryRepository.create.mockResolvedValue(categoryData);

    const result = await categoryService.create(categoryData);

    expect(result).toEqual(categoryData);
    expect(categoryService.categoryRepository.create).toHaveBeenCalledWith(categoryData);
    expect(logger.info).toHaveBeenCalledWith("", { op: "services.category.create" });
  });

  test('should throw an error when creating a category fails', async () => {
    const categoryData = { name: 'Electronics' };

    // Mock the repository method to reject an error
    categoryService.categoryRepository.create.mockRejectedValue(new Error('DB error'));

    await expect(categoryService.create(categoryData)).rejects.toThrow('DB error');
  });

  test('should retrieve all categories successfully', async () => {
    const categories = [{ id: 1, name: 'Electronics' }, { id: 2, name: 'Books' }];

    // Mock the repository method
    categoryService.categoryRepository.getAll.mockResolvedValue(categories);

    const result = await categoryService.getAll();

    expect(result).toEqual(categories);
    expect(categoryService.categoryRepository.getAll).toHaveBeenCalled();
  });

  test('should retrieve a category by id successfully', async () => {
    const category = { id: 1, name: 'Electronics' };

    // Mock the repository method
    categoryService.categoryRepository.getById.mockResolvedValue(category);

    const result = await categoryService.getById(1);

    expect(result).toEqual(category);
    expect(categoryService.categoryRepository.getById).toHaveBeenCalledWith(1);
  });

  test('should update a category successfully', async () => {
    const updatedCategory = { id: 1, name: 'Updated Electronics' };

    // Mock the repository method
    categoryService.categoryRepository.update.mockResolvedValue(updatedCategory);

    const result = await categoryService.update(1, { name: 'Updated Electronics' });

    expect(result).toEqual(updatedCategory);
    expect(categoryService.categoryRepository.update).toHaveBeenCalledWith(1, { name: 'Updated Electronics' });
  });

  test('should delete a category successfully', async () => {
    // Mock the repository method
    categoryService.categoryRepository.delete.mockResolvedValue(1);

    const result = await categoryService.delete(1);

    expect(result).toEqual(1);
    expect(categoryService.categoryRepository.delete).toHaveBeenCalledWith(1);
  });
});
