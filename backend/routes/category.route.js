const express = require('express')
const { getCategories, getCategoryById, saveCategory, updateCategory, deleteCategory } = require('../controllers/category.controller')

const router = express.Router()

router.get('/all', getCategories)
router.get('/one/:id', getCategoryById)
router.post('/', saveCategory)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)


module.exports = router 