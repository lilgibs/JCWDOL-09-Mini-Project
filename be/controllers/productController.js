const { db, query } = require("../config/database");

module.exports = {
  getAllProducts: async (req, res) => {
    try {
      const products = await query(`select * from products`)
      res.status(200).send({ data: products })
    } catch (error) {
      res.status(500).json({ message: 'Error', error });
    }
  }
}