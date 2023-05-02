const express = require('express')
const { verifyToken } = require('../middleware/authMiddleware')
const { statisticController } = require('../controllers')

const router = express.Router()

router.get('/', verifyToken, statisticController.getGrossIncome)

module.exports = router