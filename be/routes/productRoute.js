const express = require("express");
const { productController } = require("../controllers");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router()

router.get('/', productController.getAllProducts)
router.get('/user', verifyToken, productController.getAllProductsUser)
router.get('/search', productController.getProductsFilter)

module.exports = router
