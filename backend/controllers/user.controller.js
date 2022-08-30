const fs = require('fs')
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const { validateSignUpUser, validateSignInUser, validateUpdateProfile } = require('../validation/user.validation')


const getMe = asyncHandler(async (req, res) => {
    try {
        await User.findOne({ _id: req.user.id }).then(user => {
            res.status(200).json(user)
        })
    } catch (error) {

    }
})


const getUserById = asyncHandler(async (req, res) => {
    try {
        await User.findOne({ _id: req.params.id }).then(user => {
            res.status(200).json(user)
        }).catch(error => {
            res.status(400).json(error)
        })
    } catch (error) {

    }
})

const signup = asyncHandler(async (req, res) => {

    const { errors, valid } = validateSignUpUser(req.body)

    try {
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

    } catch (error) {
        res.status(400).json(error)
    }

})

const signin = asyncHandler(async (req, res) => {

    const { errors, valid } = validateSignInUser(req.body)

    try {
        if (!valid) {
            return res.status(400).json(errors)
        }

        await User.findOne(req.body.email ? { email: req.body.email } : { userName: req.body.userName }).then(async (user) => {
            if (!user) {
                return res.status(400).json({ loginError: 'Email or user name invalid' });
            }

            if (await bcrypt.compare(req.body.password, user.password)) {
                return res.status(200).json({
                    token: generateToken(user._id, user.userName)
                })
            }


            return res.status(400).json({ passwordError: 'Password is incorrect' })
        })

    } catch (error) {
        res.status(400).json(error)
    }
})

const updateProfile = asyncHandler(async (req, res) => {
    const { errors, valid } = validateUpdateProfile(req.body)
    try {

        if (!valid) {
            return res.status(400).json(errors)
        }

        await User.findOneAndUpdate(
            { userName: req.params.username },
            req.body,
            { new: true }
        ).then((user) => {
            res.status(200).json({
                result: 'Success',
                user
            })
        }).catch((err) => {
            res.status(400).json(err)
        })

    } catch (error) {
        res.status(400).json(error)
    }
})

const updateProfilePic = asyncHandler(async (req, res) => {

    try {
        if (!req.files.profilePic) {
            return res.status(400).json({ noImage: 'Select a file to upload' })
        }

        const user = await User.findOne({ userName: req.params.username })
        const imageName = Date.now() + '-' + req.files.profilePic.name
        req.files.profilePic.mv('./uploads/' + imageName)

        if (user.profilePic) {
            fs.unlinkSync('./uploads/' + user.profilePic)
        }

        await User.findOneAndUpdate(
            { userName: req.params.username },
            { profilePic: imageName },
            { new: true }
        ).then(user => {
            if (user) {
                res.status(200).json({ success: 'Profile picture changed' })
            }
        }).catch(err => {
            res.status(400).json(err)
        })

    } catch (error) {
        res.status(400).json(error)
    }

})

const generateToken = (id, userName) =>
    jwt.sign({ id, userName }, process.env.JWT_SECRET, {
        expiresIn: '5h'
    })

module.exports = {
    getMe,
    getUserById,
    signup,
    signin,
    updateProfile,
    updateProfilePic
}