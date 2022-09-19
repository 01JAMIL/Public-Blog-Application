const express = require('express')
const router = express.Router()
const { getMe, getUserById, signin, signup, updateProfile, updateProfilePic } = require('../controllers/user.controller')
const { protectUserRoute } = require('../middlewares/user.middleware')

router.get('/account', protectUserRoute, getMe)
router.get('/get-data/:id', protectUserRoute, getUserById)
router.post('/signup', signup)
router.post('/signin', signin)
router.put('/update-profile/:username', protectUserRoute, updateProfile)
router.put('/update-profile-pic/:username', protectUserRoute, updateProfilePic)

module.exports = router