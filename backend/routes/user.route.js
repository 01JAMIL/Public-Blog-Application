const express = require('express')
const router = express.Router()

router.get('/account/:username')
router.post('/signup')
router.post('/signin')
router.put('/update-profile/:username')
router.put('/update-profile-pic')

module.exports = router