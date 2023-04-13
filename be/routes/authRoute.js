const express = require('express')
const { authController } = require('../controllers')
const { verifyToken } = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/check-login', verifyToken, authController.checkLogin)

module.exports = router
