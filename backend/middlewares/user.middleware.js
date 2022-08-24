const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const protectUserRoute = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {

            token = req.headers.authorization.split(' ')[1]

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decodedToken.id).select('-password')

            next()

        } catch (error) {
            res.status(401).json('Not authorized')
        }
    }

    if (!token) {
        res.status(401).json('Not authorized, no token')
    }
})

module.exports = { protectUserRoute }