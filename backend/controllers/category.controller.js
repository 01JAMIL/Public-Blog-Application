const asyncHandler = require('express-async-handler')
const Category = require('../models/category.model')
const { validateBody } = require('../validation/category.validation')

const getCategories = asyncHandler(async (req, res) => {

    await Category.find().then(categories => {
        res.status(200).json(categories)
    }).catch(err => {
        res.status(err).json(err)
    })
})


const getCategoryById = asyncHandler(async (req, res) => {

    await Category.findOne({ _id: req.params.id }).then(cat => {
        res.status(200).json(cat)
    })

})

const saveCategory = asyncHandler(async (req, res) => {
    const { errors, valid } = validateBody(req.body)

    if (!valid) {
        return res.status(400).json(errors)
    }
    const category = new Category(req.body)
    await Category.create(category).then(cat => {
        res.status(200).json(cat)
    }).catch(err => {
        res.status(400).json(err)
    })


})

const updateCategory = asyncHandler(async (req, res) => {
    const { errors, valid } = validateBody(req.body)

    if (!valid) {
        return res.status(400).json(errors)
    }
    await Category.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
    ).then(category => {
        res.status(200).json({
            'result': 'Success',
            category
        })
    }).catch(err => {
        res.status(400).json(err)
    })

})

const deleteCategory = asyncHandler(async (req, res) => {
    await Category.findOneAndDelete({ _id: req.params.id }).then(() => {
        res.status(200).json('Category deleted successfully')
    })
})

module.exports = {
    getCategories,
    getCategoryById,
    saveCategory,
    updateCategory,
    deleteCategory
}