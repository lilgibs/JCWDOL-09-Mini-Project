const express = require("express");
const { categoryController } = require("../controllers");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router()

router.get("/", categoryController.getAllCategories);
router.get('/user', verifyToken, categoryController.getAllCategoriesUser)
router.post("/", verifyToken, categoryController.createCategory);
router.patch("/user/:id", verifyToken, categoryController.updateCategory);
router.delete("/user/:id", verifyToken, categoryController.deleteCategory);

module.exports = router