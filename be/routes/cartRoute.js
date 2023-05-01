const express = require('express')
const { cartController } = require('../controllers')
const { verifyToken } = require('../middleware/authMiddleware')
const router = express.Router()

router.get('/', verifyToken, cartController.getAllCarts)
router.post('/', verifyToken, cartController.addToCart)
router.delete('/:id_product', verifyToken, cartController.removeFromCart)

module.exports = router