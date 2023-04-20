const { db, query } = require("../config/database");

module.exports = {
  getAllProducts: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const { id_category, sortBy } = req.query;

      let sql = `select * from products where active = 1 `;

      if (id_category) {
        sql += ` AND id_category = ${db.escape(id_category)}`;
      }

      switch (sortBy) {
        case "price_low_to_high":
          sql += " ORDER BY price ASC";
          break;
        case "price_high_to_low":
          sql += " ORDER BY price DESC";
          break;
        default:
          break;
      }

      sql += ` LIMIT ${limit} OFFSET ${offset}`;

      const products = await query(sql)

      const count = await query(
        `SELECT COUNT(*) as total FROM products WHERE active = 1 ${
          id_category ? `AND id_category = ${db.escape(id_category)}` : ''
        }`
      );
      const total = count[0].total;

      res.status(200).send({ data: products, total });
    } catch (error) {
      res.status(500).json({ message: "Error", error });
    }
  },
  getAllProductsUser: async (req, res) => {
    const id = req.user.id;
    try {
      const products = await query(
        `select * from products where id_user = ${db.escape(id)}`
      );

      if (products.length === 0) {
        res.status(200).send({ message: "Tidak ada produk" });
      } else {
        res.status(200).send({ data: products });
      }
    } catch (error) {
      res.status(500).json({ message: "Error", error });
    }
  },
  AddProduct: async (req, res) => {
    const idUser = req.user.id;
    const { name, price, description, id_category } = req.body;
    const image = req.file.path;
    try {
      const products = await query(`
      insert into products(id, name, price, image, description, id_category, active, id_user)
      values(
        null,
        ${db.escape(name)},
        ${db.escape(price)},
        ${db.escape(image)},
        ${db.escape(description)},
        ${db.escape(id_category)},
        1,
        ${db.escape(idUser)}
      )
      `);
      res.status(200).send({ data: products });
    } catch (error) {
      res.status(500).json({ message: "Error", error });
    }
  },
};
