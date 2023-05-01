const express = require("express");
const { productController } = require("../controllers");
const { verifyToken } = require("../middleware/authMiddleware");
const  uploadMiddleware  = require("../middleware/uploadMiddleware");
const router = express.Router()

router.get('/', productController.getAllProducts)
router.get('/user', verifyToken, productController.getAllProductsUser)
router.post('/', verifyToken, uploadMiddleware.single('image'), productController.AddProduct);
router.patch('/user/:id',uploadMiddleware.single('image'), verifyToken, productController.updateProduct);
router.delete('/user/:id', verifyToken, productController.deleteProduct);

module.exports = router