const express = require('express')
const router = express.Router()
const { saveAdmin, signIn } = require('../controllers/admin.controller')
router.post('/save', saveAdmin)
router.post('/signin', signIn)


module.exports = router 