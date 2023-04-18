const { db, query } = require("../config/database");

module.exports = {
  getAllProducts: async (req, res) => {
    try {
      const products = await query(`select * from products where active = 1`)
      res.status(200).send({ data: products })
    } catch (error) {
      res.status(500).json({ message: 'Error', error });
    }
  },
  getProductsFilter: async (req, res) => {
    try {
      const { id_category, sortBy } = req.query

      let sql = `SELECT * FROM products WHERE active = 1`

      if (id_category) {
        sql += ` AND id_category = ${db.escape(id_category)}`;
      }

      switch (sortBy) {
        case 'price_low_to_high':
          sql += " ORDER BY price ASC";
          break;
        case 'price_high_to_low':
          sql += " ORDER BY price DESC";
          break;
        default:
          break;
      }

      const products = await query(sql)
      res.status(200).send({ data: products })
    } catch (error) {
      res.status(500).json({ message: 'Error', error });
    }
  },
  getAllProductsUser: async (req, res) => {
    const id  = req.user.id
    try {
      const products = await query(`select * from products where id_user = ${db.escape(id)}`)
      
      if (products.length === 0) {
        res.status(200).send({ message: 'Tidak ada produk' });
      } else {
        res.status(200).send({ data: products });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error', error });
    }
  },
}