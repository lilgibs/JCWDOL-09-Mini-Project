const express = require('express')
const { verifyToken } = require('../middleware/authMiddleware')
const { statisticController } = require('../controllers')

const router = express.Router()

router.get('/gross-income', verifyToken, statisticController.getGrossIncome)
router.get('/transaction', verifyToken, statisticController.getTotalTransactions)
router.get('/top-selling',  statisticController.getTopSelling)

module.exports = router