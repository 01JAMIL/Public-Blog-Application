const asyncHandler = require('express-async-handler')
const Tag = require('../models/tag.model')
const { validateBody } = require('../validation/tag.validation')

const getTags = asyncHandler(async (req, res) => {
    await Tag.find().then(tags => {
        res.status(200).json(tags)
    }).catch(err => {
        res.status(400).json(err)
    })
})

const saveTag = asyncHandler(async (req, res) => {
    const { errors, valid } = validateBody(req.body)

    if (!valid) {
        return res.status(400).json(errors)
    }

    const newTag = new Tag(req.body)

    await Tag.create(newTag).then(tag => {
        res.status(200).json(tag)
    }).catch(err => {
        res.status(400).json(err)
    })

})

const updateTag = asyncHandler(async (req, res) => {
    const { errors, valid } = validateBody(req.body)

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

})

const deleteTag = asyncHandler(async (req, res) => {
    await Tag.findOneAndDelete({ _id: req.params.id }).then(() => {
        res.status(200).json('Tag deleted')
    }).catch(err => {
        res.status(400).json(err)
    })
})

module.exports = {
    getTags,
    saveTag,
    updateTag,
    deleteTag
}