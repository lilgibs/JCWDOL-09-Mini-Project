const express = require("express");
const { productController } = require("../controllers");
const { verifyToken } = require("../middleware/authMiddleware");
const  uploadMiddleware  = require("../middleware/uploadMiddleware");
const router = express.Router()

router.get('/', productController.getAllProducts)
router.get('/user', verifyToken, productController.getAllProductsUser)
router.post('/', verifyToken, uploadMiddleware.single('image'), productController.AddProduct);

module.exports = router
