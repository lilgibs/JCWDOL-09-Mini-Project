const express = require("express");
const { categoryController } = require("../controllers");
const router = express.Router()

router.get("/", categoryController.getAllCategories);
router.post("/", categoryController.createCategory);
router.get("/:categoryId", categoryController.getCategoryById);
router.put("/:categoryId", categoryController.updateCategory);
router.delete("/:categoryId", categoryController.deleteCategory);

module.exports = router