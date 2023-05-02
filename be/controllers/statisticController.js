const { db, query } = require("../config/database");

module.exports = {
  getGrossIncome: async (req, res) => {
    try {
      const userId = req.user.id

      const { startDate, endDate } = req.query

      const defaultEndDate = new Date()
      const defaultStartDate = new Date(defaultEndDate)
      defaultStartDate.setDate(defaultStartDate.getDate() - 6)

      const start = startDate ? new Date(startDate) : defaultStartDate
      const end = endDate ? new Date(endDate) : defaultEndDate

      const grossIncomeData = await query(`
        SELECT 
          DATE(transactions.transaction_date) as date,
          SUM(transaction_items.quantity * products.price) as gross_income
        FROM transactions
        JOIN transaction_items ON transactions.id = transaction_items.id_transaction
        JOIN products ON transaction_items.id_product = products.id
        WHERE
          products.id_user = ${db.escape(userId)} AND
          DATE(transactions.transaction_date) BETWEEN ${db.escape(start)} AND ${db.escape(end)}
        GROUP BY DATE(transactions.transaction_date)
        ORDER BY DATE(transactions.transaction_date) DESC
      `)
      res.status(200).json({ data: grossIncomeData })
    } catch (error) {
      res.status(500).json({ message: "Error", error })
    }
  },

  getTotalTransactions: async (req, res) => {
    // ...
  },

  getTopSelling: async (req, res) => {
    // ...
  },
};
