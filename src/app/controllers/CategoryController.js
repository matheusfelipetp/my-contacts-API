import CategoriesRepository from '../repositories/CategoriesRepository';

class CategoryController {
  async index(req, res) {
    const { orderBy } = req.query;
    const categories = await CategoriesRepository.findAll(orderBy);

    res.json(categories);
  }

  async show(req, res) {
    const { id } = req.params;
    const category = await CategoriesRepository.findById(id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.json(category);
  }

  async store(req, res) {
    const {
      name,
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoriesRepository.create({
      name,
    });

    res.status(201).json(category);
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      name,
    } = req.body;

    const categoryExists = await CategoriesRepository.findById(id);

    if (!categoryExists) {
      return res.status(404).json({ error: 'Category not found' });
    }

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const contact = await CategoriesRepository.update(id, {
      name,
    });

    res.json(contact);
  }

  async delete(req, res) {
    const { id } = req.params;
    await CategoriesRepository.delete(id);

    res.sendStatus(204);
  }
}

export default new CategoryController();
