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

  getAllCategoriesUser: async (req, res) => {
    const id = req.user.id
    try {
      const categories = await query(`select * from categories where id_user = ${db.escape(id)} `);
      res.status(200).send({ data: categories });
    } catch (error) {
      res.status(500).json({ message: 'Error', error });
    }
  },

  createCategory: async (req, res) => {
    const idUser = req.user.id
    try {
      const categories = await query(`
        INSERT into categories (id, name, id_user)
        VALUES (
          null,
          ${db.escape(req.body.name)},
          ${db.escape(idUser)}
        )
      `)
      res.status(201).send({ data: categories });
    } catch (error) {
      res.status(500).json({ message: 'Error', error });
    }
  },

  updateCategory: async (req, res) => {
    const userId = req.user.id
    const catId = req.params.id
    try {
      const updatedCategory = await query(`
        UPDATE categories
        SET 
          name = ${db.escape(req.body.name)}
        WHERE 
          id = ${db.escape(catId)} AND id_user = ${db.escape(userId)} 
      `);
      if (updatedCategory.affectedRows === 0) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json({ data: updatedCategory, message: 'Category updated successfully'  });
    } catch (error) {
      res.status(500).json({ message: 'Error', error });
    }
  },

  deleteCategory: async (req, res) => {
    const userId = req.user.id
    const catId = req.params.id
    try {
      const deletedCategory = await query(`
        DELETE from categories
        WHERE
          id = ${db.escape(catId)} AND id_user = ${db.escape(userId)}
      `);
      if (deletedCategory.affectedRows === 0) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).send({ message: 'Category deleted', data: deletedCategory });
    } catch (error) {
      res.status(500).json({ message: 'Error', error });
    }
  },
};
