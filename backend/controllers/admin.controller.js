const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Admin = require('../models/admin.model')
const { validateSaveAdmin, validateLoginAdmin } = require('../validation/admin.validation')

const saveAdmin = asyncHandler(async (req, res) => {

    const { errors, valid } = validateSaveAdmin(req.body)

    try {
        if (!valid) {
            return res.status(400).json(errors)
        }

        const newAdmin = new Admin(req.body)

        await Admin.findOne({ userName: newAdmin.userName }).then(async (exist) => {
            if (exist) {
                return res.status(400).json({ existUser: 'This username is taken by another administrator' })
            }


            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(newAdmin.password, salt)
            newAdmin.password = hashedPassword

            await Admin.create(newAdmin).then((admin) => {
                res.status(200).json(admin)
            })

        }).catch(err => {
            res.status(400).json(err)
        })


    } catch (error) {
        res.status(400).json(error)
    }
})

const signIn = asyncHandler(async (req, res) => {

    const { errors, valid } = validateLoginAdmin(req.body)

    try {

        if (!valid) {
            return res.status(400).json(errors)
        }

        const admin = await Admin.findOne({ userName: req.body.userName })

        if (admin && await bcrypt.compare(req.body.password, admin.password)) {
            return res.status(200).json({
                token: generateToken(admin._id, admin.userName, admin.role)
            })
        }

        return res.status(400).json({ error: 'Username or password incorrect' })

    } catch (error) {
        res.status(400).json(error)
    }
})

const generateToken = (id, userName, role) => jwt.sign({ id, userName, role }, process.env.JWT_SECRET, {
    expiresIn: '5h',
})

module.exports = {
    saveAdmin,
    signIn
}