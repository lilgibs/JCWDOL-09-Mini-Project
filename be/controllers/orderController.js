const { db, query } = require("../config/database");

module.exports = {
  createOrder: async (req, res) => {
    const userId = req.user.id;

    try {
      const cartItems = await query(`
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

      if (cartItems.length === 0) {
        return res.status(400).json({ message: "Cart is empty." });
      }

      const totalAmount = cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);

      const createTransaction = await query(`
        INSERT INTO transactions(id, id_user, transaction_date, total_amount)
        VALUES(
          null,
          ${db.escape(userId)},
          NOW(),
          ${db.escape(totalAmount)}
        )
      `);

      const transactionId = createTransaction.insertId;

      console.log("transId = ", transactionId)

      for (const item of cartItems) {
        await query(`
          INSERT INTO transaction_items(id, id_transaction, id_product, quantity)
          VALUES(
            null,
            ${db.escape(transactionId)},
            ${db.escape(item.id_product)},
            ${db.escape(item.quantity)}
          )
        `);
      }

      await query(`
        DELETE FROM carts
        WHERE
          carts.id_user = ${db.escape(userId)}
      `);

      res.status(200).json({ message: 'Order created successfully' });
    } catch (error) {
      res.status(500).json({ message: "Error", error });
    }
  }
}
