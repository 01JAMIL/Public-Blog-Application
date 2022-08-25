const express = require('express')
const router = express.Router()

router.get('/account')
router.post('/signup')
router.post('/signin')
router.put('/update-profile/:username')
router.put('/update-profile-pic/:username')

module.exports = router