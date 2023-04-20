const express = require("express");
const { categoryController } = require("../controllers");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router()

router.get("/", categoryController.getAllCategories);
router.get('/user', verifyToken, categoryController.getAllCategoriesUser)
router.post("/", categoryController.createCategory);
router.get("/:categoryId", categoryController.getCategoryById);
router.put("/:categoryId", categoryController.updateCategory);
router.delete("/:categoryId", categoryController.deleteCategory);

module.exports = router