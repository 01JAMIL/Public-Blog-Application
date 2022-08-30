const asyncHandler = require('express-async-handler')
const Tag = require('../models/tag.model')
const { validateBody } = require('../validation/tag.validation')

const getTags = asyncHandler(async (req, res) => {
    try {
        await Tag.find().then(tags => {
            res.status(200).json(tags)
        }).catch(err => {
            res.status(400).json(err)
        })

    } catch (error) {
        res.status(400).json(error)
    }
})

const saveTag = asyncHandler(async (req, res) => {
    const { errors, valid } = validateBody(req.body)
    try {

        if (!valid) {
            return res.status(400).json(errors)
        }

        const newTag = new Tag(req.body)

        await Tag.create(newTag).then(tag => {
            res.status(200).json(tag)
        }).catch(err => {
            res.status(400).json(err)
        })

    } catch (error) {
        res.status(400).json(error)
    }
})

const updateTag = asyncHandler(async (req, res) => {
    const { errors, valid } = validateBody(req.body)
    try {

        if (!valid) {
            return res.status(400).json(errors)
        }

        await Tag.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        ).then((tag) => {
            res.status(200).json(tag)
        }).catch((err) => {
            res.status(400).json(err)
        })

    } catch (error) {
        res.status(400).json(error)
    }
})

const deleteTag = asyncHandler(async (req, res) => {
    try {

        await Tag.findOneAndDelete({ _id: req.params.id }).then(() => {
            res.status(200).json('Tag deleted')
        }).catch(err => {
            res.status(400).json(err)
        })

    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = {
    getTags,
    saveTag,
    updateTag,
    deleteTag
}