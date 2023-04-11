const express = require('express');
const cors = require('cors');
const { db, query } = require("./config/database")

const { authRoutes } = require('./routes');

const app = express();
require('dotenv').config();

// Middleware and configuration settings
app.use(express.json());
app.use(cors());

// Use the imported routes
app.use('/auth', authRoutes);
// app.use('/categories', categoryRoutes);
// app.use('/products', productRoutes);
// app.use('/transactions', transactionRoutes);
// app.use('/reports', reportRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
