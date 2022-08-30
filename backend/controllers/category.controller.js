const asyncHandler = require('express-async-handler')
const Category = require('../models/category.model')

const getCaegories = asyncHandler(async (req, res) => {
    try {

        await Category.find().then(categories => {
            res.status(200).json(categories)
        }).catch(err => {
            res.status(err).json(err)
        })

    } catch (error) {
        res.status(400).json(error)
    }
})

const saveCategory = asyncHandler(async (req, res) => {

    try {
        const category = new Category(req.body)
        await Category.create(category).then(cat => {
            res.status(200).json(cat)
        }).catch(err => {
            res.status(400).json(err)
        })
    } catch (error) {
        res.status(400).json(error)
    }

})

const updateCategory = asyncHandler(async (req, res) => {
    try {

        await Category.findOneAndUpdate({ _id: req.params.id }).then(category => {
            res.status(200).json({
                'result': 'Success',
                category
            })
        }).catch(err => {
            res.status(400).json(err)
        })

    } catch (error) {
        res.status(400).json(error)
    }
})

const deleteCategory = asyncHandler(async (req, res) => {
    try {

        await Category.findOneAndDelete({ _id: req.params.id }).then(() => {
            res.status(200).json('Category deleted successfully')
        })

    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = {
    getCaegories,
    saveCategory,
    updateCategory,
    deleteCategory
}