const { db, query } = require("../config/database");

module.exports = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await query(`select * from categories`);
      res.status(200).send({ data: categories });
    } catch (error) {
      res.status(500).json({ message: 'Error', error });
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).send({ data: category });
    } catch (error) {
      res.status(500).json({ message: 'Error', error });
    }
  },

  createCategory: async (req, res) => {
    try {
      const newCategory = new Category(req.body);
      await newCategory.save();
      res.status(201).send({ data: newCategory });
    } catch (error) {
      res.status(500).json({ message: 'Error', error });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).send({ data: updatedCategory });
    } catch (error) {
      res.status(500).json({ message: 'Error', error });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const deletedCategory = await Category.findByIdAndDelete(req.params.id);
      if (!deletedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).send({ message: 'Category deleted', data: deletedCategory });
    } catch (error) {
      res.status(500).json({ message: 'Error', error });
    }
  },
};
