const fs = require('fs')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const { validateSignUpUser, validateSignInUser, validateUpdateProfile } = require('../validation/user.validation')
const validator = require('validator')

const getMe = asyncHandler(async (req, res) => {
    await User.findOne({ _id: req.user.id }).then(user => {
        res.status(200).json(user)
    })
})


const getUserById = asyncHandler(async (req, res) => {
    await User.findOne({ _id: req.params.id }).then(user => {
        res.status(200).json(user)
    }).catch(error => {
        res.status(400).json(error)
    })
})

const getUserByUserName = asyncHandler(async (req, res) => {
    await User.findOne({ userName: req.params.username }).then(user => {
        res.status(200).json(user)
    }).catch(error => {
        res.status(400).json(error)
    })
})

const signup = asyncHandler(async (req, res) => {
    const { errors, valid } = validateSignUpUser(req.body)

    if (!valid) {
        return res.status(400).json(errors)
    }

    await User.findOne({ email: req.body.email }).then(async (user) => {
        if (user) {
            return res.status(400).json({ emailExist: 'This email is already used' })
        }

        await User.findOne({ userName: req.body.userName }).then(async (user) => {
            if (user) {
                return res.status(400).json({ userNameExist: 'User name already taken by another user' })
            }

            const newUser = new User(req.body)

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(newUser.password, salt)
            newUser.password = hashedPassword

            await User.create(newUser).then(() => {
                return res.status(200).json({
                    token: generateToken(newUser._id, newUser.userName)
                })
            }).catch(err => {
                return res.status(400).json(err)
            })
        })
    })
})

const signin = asyncHandler(async (req, res) => {

    const { errors, valid } = validateSignInUser(req.body)

    if (!valid) {
        return res.status(400).json(errors)
    }


    let isEmail = false
    if (validator.isEmail(req.body.userName)) {
        isEmail = true
    }

    await User.findOne(isEmail ? { email: req.body.userName } : { userName: req.body.userName }).then(async (user) => {
        if (!user) {
            return res.status(400).json({ signinError: 'Email or user name invalid' });
        }

        if (await bcrypt.compare(req.body.password, user.password)) {
            return res.status(200).json({
                token: generateToken(user._id, user.userName)
            })
        }


        return res.status(400).json({ signinError: 'Password is incorrect' })
    })

})

const updateProfile = asyncHandler(async (req, res) => {
    const { errors, valid } = validateUpdateProfile(req.body)

    if (!valid) {
        return res.status(400).json(errors)
    }

    await User.findOneAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: true }
    ).then((user) => {
        res.status(200).json(user)
    }).catch((err) => {
        res.status(400).json(err)
    })

})

const updateProfilePic = asyncHandler(async (req, res) => {

    if (!req.files.profilePic) {
        return res.status(400).json({ noImage: 'Select a file to upload' })
    }

    await User.findOneAndUpdate(
        { userName: req.params.username },
        { profilePic: base64EncodeImage(req.files.profilePic.data) },
        { new: true }
    ).then(user => {
        if (user) {
            res.status(200).json(user)
        }
    }).catch(err => {
        res.status(400).json(err)
    })

})

const generateToken = (id, userName) =>
    jwt.sign({ id, userName }, process.env.JWT_SECRET, {
        expiresIn: '5h'
    })

const base64EncodeImage = (data) => {
    // URI prefix -- data:image/png;base64,
    //const image = fs.readFileSync(data)
    return new Buffer.from(data).toString('base64')
}

module.exports = {
    getMe,
    getUserById,
    getUserByUserName,
    signup,
    signin,
    updateProfile,
    updateProfilePic
}