const { db, query } = require("../config/database")

module.exports = {
  getAllCarts: async (req, res) => {
    const userId = req.user.id
    try {
      const carts = await query(`
        SELECT 
          carts.id, 
          carts.id_user, 
          carts.id_product, 
          carts.quantity, 
          products.name, 
          products.price, 
          products.image
        FROM carts
        JOIN products ON carts.id_product = products.id
        WHERE
          carts.id_user = ${db.escape(userId)}
      `);

      res.status(200).json({ data: carts, message: "Cart items retrieved successfully." })
    } catch (error) {
      res.status(500).json({ message: "Error", error });
    }
  },
  addToCart: async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    try {
      const existingCartItem = await query(`
        SELECT * FROM carts
        WHERE
          carts.id_user = ${db.escape(userId)} AND
          carts.id_product = ${db.escape(productId)}
      `);

      if (existingCartItem.length > 0) {
        await query(`
          UPDATE carts
          SET quantity = quantity + ${db.escape(quantity)}
          WHERE
            carts.id_user = ${db.escape(userId)} AND
            carts.id_product = ${db.escape(productId)}
        `);
      } else {
        await query(`
          INSERT INTO carts(id, id_user, id_product, quantity)
          VALUES(
            NULL,
            ${db.escape(userId)},
            ${db.escape(productId)},
            ${db.escape(quantity)}
          )
        `);
      }

      const updatedCartItem = await query(`
        SELECT 
          carts.id, 
          carts.id_user, 
          carts.id_product, 
          carts.quantity, 
          products.name, 
          products.price, 
          products.image
        FROM carts
        JOIN products ON carts.id_product = products.id
        WHERE
          carts.id_user = ${db.escape(userId)} AND
          carts.id_product = ${db.escape(productId)}
      `);

      res.status(200).json({
        data: updatedCartItem,
        message: existingCartItem.length > 0
          ? "Item updated in cart successfully."
          : "Item added to cart successfully.",
      });
    } catch (error) {
      res.status(500).json({ message: "Error", error });
    }
  },
  removeFromCart: async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.id_product;
    console.log("User ID:", userId);
    console.log("Product ID:", productId);
    try {
      const item = await query(`
        DELETE FROM carts
        WHERE
          carts.id_user = ${db.escape(userId)} AND
          carts.id_product = ${db.escape(productId)}
      `)
      res.status(200).json({ data: item, message: "Item removed from cart successfully." })
    } catch (error) {
      res.status(500).json({ message: "Error", error });
    }
  }
}