const express = require('express')
const { orderController } =require('../controllers')
const { verifyToken } = require('../middleware/authMiddleware')

const router =  express.Router()

router.post('/', verifyToken, orderController.createOrder)

module.exports = router