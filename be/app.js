const express = require('express');
const cors = require('cors');
const { db, query } = require("./config/database")

const { authRoutes, productRoutes } = require('./routes');

const app = express();
require('dotenv').config();

// Middleware and configuration settings
app.use(express.json());
app.use(cors());

// Use the imported routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
