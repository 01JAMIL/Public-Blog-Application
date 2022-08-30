const express = require('express');
const { getTags, saveTag, updateTag, deleteTag } = require('../controllers/tag.controller')

const router = express.Router()


router.get('/', getTags)
router.post('/', saveTag)
router.put('/:id', updateTag)
router.delete('/:id', deleteTag)

module.exports = router